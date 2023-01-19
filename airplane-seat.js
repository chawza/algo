class AirplaneSeat {
  constructor(seats, qLength) {
    this.seats = this._revertSeatFormat(seats) 
    this.qLength = qLength 
    this.windowSeatQueue = []
    this.aileSeatQueue = []
    this.middleSeatQueue = []
    this.seatNumber = this.calculateSeatNumber(seats)
    this.tableSize = this.createSeatSize(seats)
    this.fullQueue = this.analyzeQueue()
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
      for (let formShape of this.seats) {
        let formColSize = formShape[1];
        if (rowIdx >= formShape[0]) {
          colIdxCounter += formColSize;
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
          // row 2 col 4
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
    const seatList = this.aileSeatQueue.concat(this.windowSeatQueue, this.middleSeatQueue)
    return seatList;
  }

  createEmptySeats() {
    const tableSize = this.tableSize;
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

  drawSeatByType(){
    const planeSeat = this.createEmptySeats()
    for (let seat of this.aileSeatQueue) {
      planeSeat[seat[0]][seat[1]] = 'A'
    }

    for (let seat of this.windowSeatQueue) {
      planeSeat[seat[0]][seat[1]] = 'W'
    }

    for (let seat of this.middleSeatQueue) {
      planeSeat[seat[0]][seat[1]] = 'M'
    }
    console.table(planeSeat)
  }

  drawSeatQueue() {
    console.log('Airplane passanger Seat Positioning by Queue')
    const seatList = this.fullQueue;
    const planeSeat = this.createEmptySeats()
    for(let queueIdx = 0; queueIdx < this.qLength; queueIdx++) {
      const seat = seatList[queueIdx];
      planeSeat[seat[0]][seat[1]] = queueIdx + 1;
    }
    console.table(planeSeat)
  }

  drawSeatPositions() {
    const planeSeat = this.createEmptySeats()
    let queueIdx = 0;

    const queueDict = {
      'A': this.aileSeatQueue,
      'W': this.windowSeatQueue,
      'M': this.middleSeatQueue
    }

    for (const label in queueDict) {
      for (let seat of queueDict[label]) {
        if (queueIdx >= this.qLength) {
          break;
        }
        planeSeat[seat[0]][seat[1]] = `${label}${queueIdx+1}`
        queueIdx += 1
      }

      if (queueIdx >= this.qLength) {
        break;
      }
    }

    console.table(planeSeat)
  }
}

function main() {
  const input = [[3,2], [4,3], [2,3], [3,4]] // col, row format
  const nQueue = 30 
  const airplaneseat = new AirplaneSeat(input, nQueue)
  airplaneseat.drawSeatQueue()
}

main()