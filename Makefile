deploy:
	git pull
	npm install
	npm run build
	pm2 restart frontend
	pm2 save
