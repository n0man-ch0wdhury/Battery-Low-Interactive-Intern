#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <string>

struct Task {
    int taskId;
    std::string assigneeName;
    std::string reviewerName;
    std::string status;
    int estimateInHours;
};

std::vector<Task> recommendReviewers(std::vector<Task> tasks) {
    std::unordered_map<std::string, double> effort;

    // Calculate initial efforts for each team member
    for (const auto& task : tasks) {
        effort[task.assigneeName] += task.estimateInHours;
        
        if (!task.reviewerName.empty()) {
            effort[task.reviewerName] += task.estimateInHours / 3.0;
        }
    }

    // Assign reviewers for tasks that are in "in-review" status and have no reviewer
    for (auto& task : tasks) {
        if (task.status == "in-review" && task.reviewerName.empty()) {
            std::string assignee = task.assigneeName;
            int estimate = task.estimateInHours;

            // Find the team member with the least effort who isn't the assignee
            std::string selectedReviewer;
            double minEffort = std::numeric_limits<double>::max();

            for (const auto& [name, eff] : effort) {
                if (name != assignee && eff < minEffort) {
                    selectedReviewer = name;
                    minEffort = eff;
                }
            }

            // Assign the reviewer with the least effort
            task.reviewerName = selectedReviewer;
            effort[selectedReviewer] += estimate / 3.0;
        }
    }

    return tasks;
}

int main() {
    std::vector<Task> tasks = {
        {1, "John", "", "todo", 4},
        {2, "Jane", "John", "in-review", 8},
        {3, "Jim", "", "in-review", 6}
    };

    std::vector<Task> recommendedTasks = recommendReviewers(tasks);

    for (const auto& task : recommendedTasks) {
        std::cout << "Task ID: " << task.taskId
                  << ", Assignee: " << task.assigneeName
                  << ", Reviewer: " << task.reviewerName
                  << ", Status: " << task.status
                  << ", Estimate: " << task.estimateInHours << " hours" << std::endl;
    }

    return 0;
}