module Patterns.Interfaces {    
    export interface IObservable {
        RegisterObserver(observer : IObserver) : void;
        //RemoveObserver(observer: IObserver) : void;
        NotifyObservers() : void;
    }
}
