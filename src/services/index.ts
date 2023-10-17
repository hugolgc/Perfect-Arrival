export class Service<T> {
  private collection: T[] = [];

  private constructor(private collectionName: string) {
    this.loadCollection();
  }

  private loadCollection() {
    const data = localStorage.getItem(this.collectionName);
    this.collection = data ? JSON.parse(data) : [];
  }

  private saveCollection() {
    localStorage.setItem(this.collectionName, JSON.stringify(this.collection));
  }

  insertOne(document: T) {
    this.collection.push(document);
    this.saveCollection();
  }

  insertMany(documents: T[]) {
    this.collection.push(...documents);
    this.saveCollection();
  }

  find(filterFn: (document: T) => boolean) {
    return this.collection.filter(filterFn);
  }

  findOne(filterFn: (document: T) => boolean) {
    return this.collection.find(filterFn);
  }

  updateOne(filterFn: (document: T) => boolean, updateFn: (document: T) => T) {
    const index = this.collection.findIndex(filterFn);
    if (index !== -1) {
      this.collection[index] = updateFn(this.collection[index]);
      this.saveCollection();
    }
  }

  updateMany(filterFn: (document: T) => boolean, updateFn: (document: T) => T) {
    for (let i = 0; i < this.collection.length; i++) {
      if (filterFn(this.collection[i])) {
        this.collection[i] = updateFn(this.collection[i]);
      }
    }
    this.saveCollection();
  }

  deleteOne(filterFn: (document: T) => boolean) {
    const index = this.collection.findIndex(filterFn);
    if (index !== -1) {
      this.collection.splice(index, 1);
      this.saveCollection();
    }
  }

  deleteMany(filterFn: (document: T) => boolean) {
    for (let i = this.collection.length - 1; i >= 0; i--) {
      if (filterFn(this.collection[i])) {
        this.collection.splice(i, 1);
      }
    }
    this.saveCollection();
  }

  countDocuments(filterFn: (document: T) => boolean) {
    return this.collection.filter(filterFn).length;
  }

  static collection<T>(collectionName: string) {
    return new Service<T>(collectionName);
  }

  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

/*
const userService = Service.collection<{ id: number; name: string }>('users');

userService.insertOne({ id: 1, name: 'John' });
userService.insertOne({ id: 2, name: 'Alice' });

const john = userService.findOne((user) => user.id === 1);
console.log(john); // { id: 1, name: 'John' }

userService.updateOne(
  (user) => user.id === 1,
  (user) => ({ ...user, name: 'Johnny' })
);

const johnny = userService.findOne((user) => user.id === 1);
console.log(johnny); // { id: 1, name: 'Johnny' }

userService.deleteOne((user) => user.id === 1);

console.log(userService.find((user) => user.id === 1)); // []
console.log(userService.countDocuments(() => true)); // 1
*/
