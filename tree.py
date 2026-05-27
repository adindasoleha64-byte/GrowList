class TaskNode:
    def __init__(self, title):
        self.title = title
        self.children = []
        self.completed = False

    def add_child(self, child):
        self.children.append(child)

    def to_dict(self):
        return {
            "title": self.title,
            "completed": self.completed,
            "children": [child.to_dict() for child in self.children]
        }
