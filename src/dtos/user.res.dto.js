export default class UserResDto {
    constructor(data) {
        this.fullname = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        this.email = data.email;
        this.age = data.age;
        this.role = data.role;
        this.cart = data.cart;
    }
}
export class AllUserResDto {
    constructor(data) {
        this.fullname = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        this.email = data.email;
        this.role = data.role;
    }
}