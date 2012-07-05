/**
* test case for LoanRepayment.js
*
* @author Larry Battle - <http://bateru.com/news/contact-me>
* @date July 4, 2012
* @license MIT <http://www.opensource.org/licenses/mit-license.html>
* @project <https://github.com/LarryBattle/loanRepayment.js>
* @requires qunit.js, loanRepayment.js
*/
var runTests = function () {
	module( "Loan" );
	test( "test Loan instantiation", function(){
		var loan = new Loan();
		equal( loan.toString(), "amount: 0, payment: 0, interest: 0, minimum payment:0" );
	});
	
	module( "Debt" );
	test( "test Debt.getCost()", function(){
		var func = Debt.getCost;
		
		equal( func( Debt.createDebt(100, 100, 0.1 ) ), 0 );
		equal( func( Debt.createDebt(100, 500, 0.1 ) ), 0 );
		equal( func( Debt.createDebt(100, 25, 0.05 ) ), 3.75 );
		equal( func( Debt.createDebt(100, 0, 0.05 ) ), 5 );
		equal( func( Debt.createDebt(100, 0, 0.5 ) ), 50 );
	});
	test( "test Debt.findHighestLoan()", function(){
		var func = Debt.findHighestLoan;
		var arr = [
			Debt.createDebt( 100, 30, 0.05 ),
			Debt.createDebt( 100, 20, 0.05 ),
			Debt.createDebt( 100, 10, 0.05 ),
			Debt.createDebt( 100, 0, 0.05 )
		];
		deepEqual( func(arr), 3 );
		
		arr = [
			Debt.createDebt( 100, 0, 0.25 ),
			Debt.createDebt( 100, 0, 0.15 ),
			Debt.createDebt( 100, 0, 0.05 ),
			Debt.createDebt( 100, 0, 0.00 )
		];
		deepEqual( func(arr), 0 );
		
		arr = [
			Debt.createDebt( 100, 0, 0.25 ),
			Debt.createDebt( 100, 0, 0.25 ),
			Debt.createDebt( 100, 0, 0.25 )
		];
		deepEqual( func(arr), 2 );
		
		arr = [
			Debt.createDebt( 400, 399, 0.25 ),
			Debt.createDebt( 700, 600, 0.25 ),
			Debt.createDebt( 100, 90, 0.25 )
		];
		deepEqual( func(arr), 1 );
	});
	test( "test Debt.getSumOfLoans()", function(){
		var func = Debt.getSumOfLoans;
		var arr = [
			Debt.createDebt( 100, 0, 0.25 ),
			Debt.createDebt( 100, 0, 0.15 ),
			Debt.createDebt( 100, 0, 0.05 ),
			Debt.createDebt( 100, 0, 0.00 )
		];
		
		equal( func( arr ), 400 );
		equal( func( arr, true ), 445 );
	});
	test( "test Debt.getMinPaymentSum()", function(){
		var func = Debt.getMinPaymentSum;
		var loans = [
			Debt.createDebt( 100, 0, 0.00, 10 ),
			Debt.createDebt( 100, 0, 0.00, 10 ),
			Debt.createDebt( 100, 0, 0.00, 10 ),
			Debt.createDebt( 100, 0, 0.00, 10 )
		];
		equal( func( loans ), 40 );
	});
	test( "test Debt.makeMinLoanPayments()", function(){
		var func = Debt.makeMinLoanPayments;
		var loans = [
			Debt.createDebt( 100, 0, 0.00, 10 )
		];
		equal( func(loans, 100).join( ";" ), [ Debt.createDebt( 100, 10, 0.00, 10 )	].join(";") );
	});
};
var reRunTests = function () {
	QUnit.reset(); // should clear the DOM
	QUnit.init(); // resets the qunit test environment
	QUnit.start(); // allows for the new test to be captured.
	runTests();
};