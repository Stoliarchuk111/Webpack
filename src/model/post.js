let unused;

console.log(unused);

export default class Post {
    constructor(title, img) {
        this.title = title;
        this.date = new Date();
        this.img = img;
    }
    toString() {
        return JSON.stringify({
            date: this.date.toJSON(),
            img: this.img,
            title: this.title,
        }, null, 4);
      }
    }