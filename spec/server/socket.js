var expect = require('chai').expect;
var io = require('socket.io-client');
var ioserver = require('socket.io');
var socketTestURL = 'http://127.0.0.1:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Socket.io Server Routing', function() {

  var server;

  beforeEach(function() {
    server = require('../../index.js');
  });

  afterEach(function() {
    server = undefined;
  });

  it('Should send staffRoom event and customerRoom event when staff member connects after customer', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    customerSocket1.on('connect', function(data){
      customerSocket1.emit('customerRequest', 'ShoeLocker')
    });
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(data){
      staffSocket1.emit('staffReady', 'ShoeLocker')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_1');
    });
    customerSocket1.on('customerRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_1');
      staffSocket1.disconnect();
      customerSocket1.disconnect();
      done(); 
    });
  });

  it('Should create new room on "staffReady"', function(done) {
    var staffSocket = io.connect(socketTestURL, options);
    staffSocket.on('connect', function(data){
      staffSocket.emit('staffReady', 'ShoeLocker')
    });
    staffSocket.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_2');
      staffSocket.disconnect();
      done();
    });
  });

  it('Third roomname should equal "room_ShoeLocker_3"', function(done) {
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(data){
      staffSocket1.emit('staffReady', 'ShoeLocker')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_3');
      staffSocket1.disconnect();
      done();
    });
  });

  it('"staffRoom" should only be sent to socket connection that sent "staffReady"', function(done) {
    var staffSocket1 = io.connect(socketTestURL, options);
    var staffSocket2 = io.connect(socketTestURL, options);
    staffSocket2.on('connect', function(data){
      staffSocket2.emit('staffReady', 'roomname1')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(Constructor).to.throw(Error);
    });
    staffSocket2.on('staffRoom', function(name) {
      staffSocket1.disconnect();
      staffSocket2.disconnect();      
      done();
    });
  });

  it('Room names of disconnected staff from previous test are removed from socketroute.rooms array', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    customerSocket1.on('connect', function(){
      customerSocket1.emit('customerRequest', 'ShoeLocker');
    });
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(){
      staffSocket1.emit('staffReady', 'ShoeLocker');
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_5');
    });
    customerSocket1.on('customerRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_5');
      staffSocket1.disconnect();
      customerSocket1.disconnect();
      done();
    });
  });

  it('Should send customerRoom event to second customer if first customer disconnects before staff member connects', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    var customerSocket2 = io.connect(socketTestURL, options);
    var refCustomer3;
    var refCustomer4;

    customerSocket1.on('connect', function() {
      customerSocket1.emit('customerRequest', 'ShoeLocker');
    });
    customerSocket2.on('connect', function() {
      customerSocket2.emit('customerRequest', 'ShoeLocker');
      customerSocket1.disconnect();
      staffSocket1 = io.connect(socketTestURL, options);
    });

    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function() {
      staffSocket1.emit('staffReady', 'ShoeLocker');
      staffSocket1.on('queueStatus', function(queue) {
        num += 1;
        if (num === 3) {
          staffSocket1.disconnect();
          refCustomer3.disconnect();
          refCustomer4.disconnect();
          done();
        }
      });
    });
    var num = 0;

    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_6');
    });
    customerSocket1.on('customerRoom', function(name) {
      expect(Constructor).to.throw(Error);
    });

    customerSocket2.on('customerRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_6');
      var customerSocket3 = io.connect(socketTestURL, options);
      var customerSocket4 = io.connect(socketTestURL, options);
      customerSocket3.on('connect', function() {
        refCustomer3 = customerSocket3;
        customerSocket3.emit('customerRequest', 'ShoeLocker');
      });
      customerSocket4.on('connect', function() {
        refCustomer4 = customerSocket4;

        customerSocket4.emit('customerRequest', 'ShoeLocker');
      });
    });
  });

  it('Do not emit "staffRoom" to staffSocket if the staff currently in a room with no customer', function(done) {
    var counter = 0;
    var staffSocket3 = io.connect(socketTestURL, options);
    staffSocket3.on('connect', function(){
      staffSocket3.emit('staffReady', 'ShoeLocker');
    });
    staffSocket3.on('staffRoom', function(name) {
      counter += 1;
      if (counter === 1) {
        staffSocket3.emit('staffReady', 'ShoeLocker');
        setTimeout(function() {
          done();
        }, 1500);
      }
      if (counter === 2) {
        console.log("Problem, ")
        expect(Constructor).to.throw(Error);
      }
    });

  });

});
