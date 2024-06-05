// Request class
class RequestModel {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
  
    constructor(id: string, title: string, description: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = 'pending';
    }
  
    approve(): void {
      this.status = 'approved';
    }
  
    reject(): void {
      this.status = 'rejected';
    }
  }
  
  // Notification class
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
  
  // RequestPublisher (Subject)
  class RequestPublisher {
    private observers: RequestObserver[] = [];
  
    attach(observer: RequestObserver): void {
      this.observers.push(observer);
    }
  
    detach(observer: RequestObserver): void {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  
    notifyObservers(request: RequestModel): void {
      for (const observer of this.observers) {
        observer.update(request);
      }
    }
  
    submitRequest(request: RequestModel): void {
      console.log('New request submitted:', request);
      this.notifyObservers(request);
    }
  
    approveRequest(request: RequestModel): void {
      request.approve();
      console.log('Request approved:', request);
      this.notifyObservers(request);
    }
  
    rejectRequest(request: RequestModel): void {
      request.reject();
      console.log('Request rejected:', request);
      this.notifyObservers(request);
    }
  }
  
  // RequestObserver (Observer)
  interface RequestObserver {
    update(request: RequestModel): void;
  }
  
  class EmailNotificationObserver implements RequestObserver {
    update(request: RequestModel): void {
      const notification = new NotificationModel(
        `${request.id}-email`,
        `Request ${request.status}`,
        `The request "${request.title}" has been ${request.status}.`
      );
      console.log('Sending email notification:', notification);
      // Implement email sending logic
    }
  }
  
  class PushNotificationObserver implements RequestObserver {
    update(request: RequestModel): void {
      const notification = new NotificationModel(
        `${request.id}-push`,
        `Request ${request.status}`,
        `The request "${request.title}" has been ${request.status}.`
      );
      console.log('Sending push notification:', notification);
      // Implement push notification logic
    }
  }
  
  class WebsiteNotificationObserver implements RequestObserver {
    update(request: RequestModel): void {
      const notification = new NotificationModel(
        `${request.id}-website`,
        `Request ${request.status}`,
        `The request "${request.title}" has been ${request.status}.`
      );
      console.log('Displaying notification on website:', notification);
      // Implement website display logic
    }
  }
  
  // Usage
  const requestPublisher = new RequestPublisher();
  
  const emailObserver = new EmailNotificationObserver();
  const pushObserver = new PushNotificationObserver();
  const websiteObserver = new WebsiteNotificationObserver();
  
  requestPublisher.attach(emailObserver);
  requestPublisher.attach(pushObserver);
  requestPublisher.attach(websiteObserver);
  
  const request1 = new RequestModel('req1', 'New computer', 'I need a new computer for my work');
  requestPublisher.submitRequest(request1);
  
  requestPublisher.approveRequest(request1);
  requestPublisher.rejectRequest(request1);