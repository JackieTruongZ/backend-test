class NotificationModel {
    id: string;
    title: string;
    message: string;
    read: boolean;

    constructor(id: string, title: string, message: string) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.read = false;
    }

    markAsRead(): void {
        this.read = true;
    }
}

export default NotificationModel;