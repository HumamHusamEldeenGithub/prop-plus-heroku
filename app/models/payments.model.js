const sql = require("./db");

const Payment = function (payment) {
  this.id = payment.id;
  this.booking_id = payment.booking_id;
  this.amount = payment.amount ; 
  this.payment_type = payment.payment_type;
  this.payment_date = payment.payment_date;
};

Payment.create = (newPayment, result) => {
  sql.query("INSERT INTO payments SET ?", newPayment, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("created Payment");
    result(null, { id: res.insertId, ...newPayment });
  });
};

Payment.findById = (PaymentId, result) => {
  sql.query("SELECT * FROM payments WHERE id = ?", PaymentId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Payment " + res[0]);
      result(null, res[0]);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};

Payment.getAll = (result) => {
  sql.query("SELECT * FROM payments", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Payment.updateById = (paymentId, newPayment, result) => {
  sql.query(
    "UPDATE payments SET id = ? , booking_id = ?, amount = ? , payment_type = ? , payment_date = ? WHERE id = ",
    [
      newPayment.id,
      newPayment.booking_id,
      newPayment.amount,
      newPayment.payment_type,
      newPayment.payment_date,
      paymentId,
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
      console.log("Payment " + PaymentId + " has been updated");
      result(null, { id: PaymentId, ...newPayment });
    }
  );
};

Payment.remove = (id, result) => {
  sql.query("DELETE FROM payments WHERE id = ?", id, (err, res) => {
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
    console.log("deleted payment with id = ", id);
    result(null, res);
  });
};
Payment.removeAll = (result) => {
  sql.query("DELETE FROM payments", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " Payments");
    result(null, res);
  });
};

module.exports = Payment;

