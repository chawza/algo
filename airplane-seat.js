class AirplaneSeat {
  constructor(seats, qLength) {
    this.seats = this._revertSeatFormat(seats) 
    this.qLength = qLength 
    this.windowSeatQueue = []
    this.aileSeatQueue = []
    this.middleSeatQueue = []
    this.seatNumber = this.calculateSeatNumber(seats)
    this.tableSize = this.createSeatSize(seats)
    this.analyzeQueue()
    this.createTableVisualization(this.qLength)
  }

  _revertSeatFormat(seats) {
    return seats.map(a => [a[1], a[0]])
  }

  calculateSeatNumber(seats) {
    let nSeat = 0
    for(let seatForm of seats) {
      nSeat += (seatForm[0] * seatForm[1])
    }
    return nSeat;
  }

  createSeatSize(seats) {
    let maxRow = 0;
    let maxCol = 0;

    for(let seatForm of seats) {
      if (seatForm[1] > maxRow)
        maxRow = seatForm[1]
    }

    for(let seatForm of seats) {
      maxCol += seatForm[0]
    }
    return [maxRow, maxCol]
  }

  analyzeQueue() {
    for(let rowIdx = 0; rowIdx < this.tableSize[0]; rowIdx++){
      let colIdxCounter = 0;
      const columnSizeList = this.seats.map(a => {
        if (rowIdx < a[0]) 
          return a[1]
        return 0
      });
      for (let formColSize of columnSizeList) {
        if (columnSizeList == 0) {
          continue
        }
        for (let formColIdx = colIdxCounter; formColIdx < formColSize + colIdxCounter; formColIdx++) {
          let colIdx = formColIdx;
          // if seat in window
          if (colIdx == 0 || colIdx == this.tableSize[1] - 1) {
            this.windowSeatQueue.push([rowIdx, colIdx])
            continue
          }
          
          // if seat in aisle
          if (colIdx == colIdxCounter || colIdx == (formColSize + colIdxCounter - 1)) {
            this.aileSeatQueue.push([rowIdx, colIdx])
            continue
          }

          // if seat in middle
          this.middleSeatQueue.push([rowIdx, colIdx])
        }
        colIdxCounter += formColSize;
      }
    }

    console.log('total saet created\t: ', this.aileSeatQueue.length + this.middleSeatQueue.length + this.windowSeatQueue.length)
    console.log('Aisles seat\t: ', this.aileSeatQueue)
    console.log('Window seat\t: ', this.windowSeatQueue)
    console.log('Middle Seat\t: ', this.middleSeatQueue)
  }

  _printTable(table) {
    console.table()
  }
  createTableVisualization(queueNumber) {
    const tableSize = this.tableSize;
    function createEmptySeats() {
      const tableSeats = []
      for(let row = 0; row < tableSize[0]; row++) {
        const rowSeats = []
        for(let col = 0; col < tableSize[1]; col++) {
          rowSeats.push('X')
        }

        tableSeats.push(rowSeats);
      } 
      return tableSeats
    }
    const seatList = this.aileSeatQueue.concat(this.windowSeatQueue, this.middleSeatQueue)
    const planeSeat = createEmptySeats()
    console.log(seatList)
    // console.log(planeSeat)
    for(let queueIdx = 0; queueIdx < queueNumber; queueIdx++) {
      const seat = seatList[queueIdx];
      planeSeat[seat[0]][seat[1]] = queueIdx + 1;
    }

    console.table(planeSeat)

  }

}

function main() {
  const input = [[3,2], [4,3], [2,3], [3,4]] // col, row format
  const nQueue = 24 
  const airplaneseat = new AirplaneSeat(input, nQueue)
  // console.log(airplaneseat)
}

main()