module Patterns.Interfaces {    

    export class CollisionDetector implements Patterns.Interfaces.IObserver{
        static NextId: number = 0;

        private _subject: Patterns.Interfaces.IObservable;
        private _myId: number;

        constructor(mySubject: Patterns.Interfaces.IObservable){
            this._subject = mySubject;
            this._myId = CollisionDetector.NextId++;
        }

        public ReceiveNotification(Enemy: Enemy){
            // nada
        }
    }

}