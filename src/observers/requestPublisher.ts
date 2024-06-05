import { RequestObserver } from "./requestObserver.interface";

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

    notifyObservers(request: any): void {
        for (const observer of this.observers) {
            observer.update(request);
        }
    }

    submitRequest(request: any): void {
        console.log('New request submitted:', request);
        this.notifyObservers(request);
    }

    approveRequest(request: any): void {
        request.approve();
        console.log('Request approved:', request);
        this.notifyObservers(request);
    }

    rejectRequest(request: any): void {
        request.reject();
        console.log('Request rejected:', request);
        this.notifyObservers(request);
    }
}

export default RequestPublisher;