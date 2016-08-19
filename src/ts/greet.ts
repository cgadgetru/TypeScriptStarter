export class Greet {

    userName: string = 'John';

    greet(message?: string) {
        alert(this.userName + message);
    }
}