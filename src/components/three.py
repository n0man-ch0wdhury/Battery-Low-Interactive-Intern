from datetime import datetime
from collections import defaultdict
from operator import itemgetter

class User:
    def __init__(self, name, phone_number):
        self.name = name
        self.phone_number = phone_number

class Message:
    def __init__(self, sender, receiver, text):
        self.sender = sender
        self.receiver = receiver
        self.text = text
        self.timestamp = datetime.now()  # timestamp for sorting

class ChatApp:
    def __init__(self):
        self.users = {}  
        self.messages = []  

    def create_user(self, name, phone_number):
        if phone_number not in self.users:
            self.users[phone_number] = User(name, phone_number)
        else:
            print("User with this phone number already exists.")

    def send_message(self, sender_phone, receiver_phone, text):
        sender = self.users.get(sender_phone)
        receiver = self.users.get(receiver_phone)

        if sender and receiver:
            message = Message(sender, receiver, text)
            self.messages.append(message)
        else:
            print("One or both users not found.")

    # Method to get all messages for a specific user, sorted by the most recent first
    def get_messages(self, user_phone):
        user_messages = []

        # Collect all messages where the user is either the sender or receiver
        for message in self.messages:
            if message.sender.phone_number == user_phone or message.receiver.phone_number == user_phone:
                user_messages.append(message)

        # Sort the messages by timestamp in descending order
        user_messages.sort(key=lambda m: m.timestamp, reverse=True)
        return user_messages


    def get_top_friends(self, user_phone):
        friend_message_count = defaultdict(int)

        # Count messages exchanged with each friend
        for message in self.messages:
            if message.sender.phone_number == user_phone:
                friend_phone = message.receiver.phone_number
                friend_name = message.receiver.name
            elif message.receiver.phone_number == user_phone:
                friend_phone = message.sender.phone_number
                friend_name = message.sender.name
            else:
                continue

            friend_message_count[(friend_name, friend_phone)] += 1

        # Sort friends by the number of messages exchanged
        sorted_friends = sorted(friend_message_count.items(), key=itemgetter(1), reverse=True)

        # Get the top 10 friends with detailed information
        top_friends = [
            {
                "personA": self.users[user_phone].name,
                "personAPhone": user_phone,
                "personB": friend_name,
                "personBPhone": friend_phone,
                "numberOfMessages": count
            }
            for (friend_name, friend_phone), count in sorted_friends[:10]
        ]

        return top_friends


# Example usage
if __name__ == "__main__":
    app = ChatApp()

    # Create users
    app.create_user("John", "01717001473")
    app.create_user("Jane", "01717001472")

    # Send messages
    app.send_message("01717001473", "01717001472", "Hello Jane!")
    app.send_message("01717001472", "01717001473", "Hi John!")
    app.send_message("01717001473", "01717001472", "How are you?")
    app.send_message("01717001472", "01717001473", "I'm good, thanks!")

    # Get messages for John
    john_messages = app.get_messages("01717001473")
    print("Messages for John:")
    for message in john_messages:
        print(f"{message.text} (from: {message.sender.name})")

    # Get top friends for John
    top_friends = app.get_top_friends("01717001473")
    print("\nTop Friends for John:")
    for friend in top_friends:
        print(friend)