const sql = require("./db");

const Booking = function (booking) {
  this.user_id = booking.user_id;
  this.service_id = booking.service_id;
  this.start_date = booking.start_date;
  this.end_date = booking.end_date;
};

Booking.create = (newBooking, result) => {
  sql.query("INSERT INTO bookings SET ?", newBooking, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("created booking");
    result(null, { id: res.insertId, ...newBooking });
  });
};

Booking.findById = (bookingId, result) => {
  sql.query("SELECT * FROM bookings WHERE id = ?", bookingId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found booking " + res[0]);
      result(null, res[0]);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};

Booking.getAll = (result) => {
  sql.query("SELECT * FROM bookings", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Booking.updateById = (bookingId, newBooking, result) => {
  sql.query(
    "UPDATE bookings SET user_id = ? , service_id = ? , start_date = ? , end_date = ? WHERE id = ",
    [
      newBooking.user_id,
      newBooking.service_id,
      newBooking.start_date,
      newBooking.end_date,
      bookingId,
    ],
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      //NOT FOUND
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("booking " + bookingId + " has been updated");
      result(null, { id: bookingId, ...newBooking });
    }
  );
};

Booking.remove = (id, result) => {
  sql.query("DELETE FROM bookings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    //NOT FOUND
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted booking with id = ", id);
    result(null, res);
  });
};
Booking.removeAll = (result) => {
  sql.query("DELETE FROM bookings", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " bookings");
    result(null, res);
  });
};

module.exports = Booking;

