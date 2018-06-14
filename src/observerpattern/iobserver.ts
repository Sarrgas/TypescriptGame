module Patterns.Interfaces {    
    export interface IObserver {
        ReceiveNotification(Enemy: Enemy): void;
    }
}
