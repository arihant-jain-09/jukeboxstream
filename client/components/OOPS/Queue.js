module.exports = class Queue {
  constructor() {
    this.head;
    this.tail;
  }
  enqueue(value) {
    var link = { value, next: void 0 };
    this.tail = this.head ? (this.tail.next = link) : (this.head = link);
  }
  dequeue() {
    var first;
    return (
      this.head &&
      ((first = this.head.value), (this.head = this.head.next), first)
    );
  }
  peek() {
    return this.head && this.head.value;
  }

  printQueue() {
    let temp = this.head;
    while (temp != null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }
};
