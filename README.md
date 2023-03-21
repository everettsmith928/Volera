# Welcome to Volera: 

A Low-Friction Freelance Marketplace built on the XRPL

A new way to hire and retain freelancers in an ethical and sustainable way with the lowest possible platform fees.

Utilizing a blockchain solution with low environmental impact, and a proven decade of 24/7 payments.

Highly secure and tracable funds using the XRPL. Fee collected with proposed layer one smart contract hooks feature.

##Milestones

We want to build a freelance website with low fees.

Hosting with DigitalOcean
	Decent price point and scales.
	Serves our website (NodeJS) and our Database(MySQL)

Using NodeJS
	MVC Model
	Currently holding off on models with MySQL - looks more Non-relational focused.
	Views separated into 3 categories
		Platform (Not yet started - but will be the actual website once launch)
		Development - Tab to test functionalities as we develop
		About - Marketing / informational page while we develop the website

	Controllers
		DB Controller
		Email Controller
		XRPL Controller
		Xumm Controller

MySQL (Relational Database)
	Wanted to use SQL like database to verify and hold transactions

Have our website doing basic connections to our MySQL database, Volera gmail domain, XUMM and XRPL and will slowly be testing components as we build it up.

Transaction Methodology
Check enterprise sufficient funds using xrpl wallet enquire balance
Create payload with xumm wallet sign request as escrow to receiving freelancer
On incoming transaction hook >carbon< will send 5% to the Volera legacy wallet as the platform fee

