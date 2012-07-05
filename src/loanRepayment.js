/**
* LoanRepayment.js
*
* @author Larry Battle <bateru.com/news/contact-me>
* @date 07/04/2012
* @license MIT <http://www.opensource.org/licenses/mit-license.html>
* @project <https://github.com/LarryBattle/loanRepayment.js>
* @version 0.1
*/
var Loan = function(){
	if( !(this instanceof Loan) ){
		return Loan.create.apply(this, arguments);
	}
	this.principal = 0;
	this.payment = 0;
	this.interest = 0;
	this.minPayment = 0;
	return this;
};
/**
* @see Loan.prototype.parse
* Same as Loan.prototype.parse, except returns a new loan.
*/
Loan.create = function(){
	var obj = new Loan();
	return obj.parse.apply(obj,arguments);
};
Loan.prototype.toString = function(){
	var str = "amount: " + this.principal;
	str += ", payment: " + this.payment;
	str += ", interest: " + this.interest;
	str += ", minimum payment:" + this.minPayment;
	return str;
};
Loan.prototype.parse = function(amount, payment, interest, paymentLength, minPayment ){
	var minPay = 0 < paymentLength ? Math.floor( amount/paymentLength) : 0;
	if( minPayment ){
		minPay = minPayment;
	}
	this.principal = amount;
	this.payment = payment;
	this.interest = interest;
	this.minPayment = minPay;
	return this;
};
var Debt = {};
Debt.createDebt = function(){
	return Loan.create.apply(1, arguments);
};
/*
* Returns the current cost of a loan.
*
* @param {Loan} loan
* @returns {Number}
*/
Debt.getCost = function( loan ){
	if( typeof loan !== "object" ){
		return 0;
	}
	var cost = ( loan.principal - loan.payment) * loan.interest;
	return 0 < cost ? cost : 0;
};
/*
* Returns the index of the highest loan.
*
* @param {Array <Loan>} loans
* @returns {Number}
*/
Debt.findHighestLoan = function( loans ){
	if( typeof loans !== "object" ){
		return -1;
	}
	var index = -1, i = loans.length, maxCost = 0;
	while( i-- ){
		thisCost = Debt.getCost( loans[ i ] );
		if( maxCost < thisCost ){
			maxCost = thisCost;
			index = i;
		}
	}
	return index;
};
/*
* Returns the sum of the payments for all the loans.
*
* @param {Array <Loan>} loans
* @param {Boolean} includeInterest - should interest be included in the payments?
* @returns {Number}
*/
Debt.getSumOfLoans = function( loans, includeInterest ){
	if( typeof loans !== "object" ){
		return -1;
	}
	var sum = 0, interest = 0, i = loans.length;
	while( i-- ){
		interest = includeInterest ? +(1 + loans[i].interest) : 1;
		sum += loans[ i ].principal * interest;
	}
	return sum;
};
/*
* Returns the sum of the minimun payments for each loan.
*
* @param {Array <Loan>} loans
* @returns {Number}
*/
Debt.getMinPaymentSum = function( loans ){
	if( typeof loans !== "object" ){
		return -1;
	}
	var sum = 0, i = loans.length;
	while( i-- ){
		sum += +loans[ i ].minPayment;
	}
	return sum;
};
/*
* Attaches the minimum loan payment to each loan object.
*
* @param {Array <Loan>} loans
* @param {Number} payment
* @returns {Array <Loan>}
*/
Debt.makeMinLoanPayments = function( loans, payment ){
	if( typeof loans !== "object" ){
		return -1;
	}
	var i = loans.length;
	var minPay;
	while( i-- ){
		if( 0 < payment ){
			minPay = loans[i].minPayment;
			loans[i].payment += minPay < payment ? minPay : payment;
			payment -= loans[i].minPayment;
		}
	}
	return loans;
};
/*
* Computes the loan payments from the information provided by the loan objects.
*
* @param {Array <Loan>} loans
* @param {Number} payment
* @returns {Array <Loan>}
*/
Debt.makeLoanPayments = function( loans, payment ){
	var i;
	if( 0 < payment ){
		while( payment-- ){
			i = Debt.findHighestLoan( loans );
			if( loans[i] ){
				loans[i].payment++;
			}
		}
	}
	return loans;
};
/*
* Attaches the loan payments to the loan objects.
*
* @param {Array <Loan>} loans
* @param {Number} payment
* @returns {Array <Loan>}
*/
Debt.getLoansPayments = function( loans, payment ){
	if( typeof loans !== "object" ){
		return -1;
	}
	var sumOfLoans = Debt.getSumOfLoans( loans );
	payment = (sumOfLoans < payment) ? sumOfLoans : payment;
	var sumOfMinPayments = Debt.getMinPaymentSum( loans );
	if( 0 < payment ){			
		loans = Debt.makeMinLoanPayments( loans, payment );
		payment -= sumOfMinPayments;
		Debt.makeLoanPayments( loans, payment );
	}
	return loans;
};