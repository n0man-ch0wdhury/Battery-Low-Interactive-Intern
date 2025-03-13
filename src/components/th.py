def recommendReviewers(tasks):
    totalEffort = {}

    for task in tasks:
        assignee = task['assigneeName']
        reviewer = task['reviewerName']
        estimate = task['estimateInHours']
        
        if assignee not in totalEffort:
            totalEffort[assignee] = 0
        totalEffort[assignee] += estimate
        
        if reviewer:
            if reviewer not in totalEffort:
                totalEffort[reviewer] = 0
            totalEffort[reviewer] += estimate * 1/3

    for task in tasks:
        if task['status'] == "in-review" and task['reviewerName'] is None:
            assignee = task['assigneeName']
            estimate = task['estimateInHours']
            
            toBeReviewers = [(name, effort) for name, effort in totalEffort.items() if name != assignee]
            toBeReviewers.sort(key=lambda x: x[1])
            
            finalReviewer = toBeReviewers[0][0]
            task['reviewerName'] = finalReviewer
            
            totalEffort[finalReviewer] += estimate * 1/3

    return tasks

tasks = [
    {
        "taskId": 1,
        "assigneeName": "John",
        "reviewerName": None,
        "status": "in-review",
        "estimateInHours": 4
    },
    {
        "taskId": 2,
        "assigneeName": "Jane",
        "reviewerName": "John",
        "status": "in-review",
        "estimateInHours": 1
    },
    {
        "taskId": 3,
        "assigneeName": "Jim",
        "reviewerName": None,
        "status": "in-review",
        "estimateInHours": 6
    }
]

finalRecommendation = recommendReviewers(tasks)
print(finalRecommendation)