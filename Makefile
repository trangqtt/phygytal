build-admin:
	docker build --build-arg APP=admin -t asia-southeast1-docker.pkg.dev/phygital-388705/dev/admin .
run-admin: build-admin
	docker rm -f admin-frontend && docker run -d --name admin-frontend -p 3111:3000 asia-southeast1-docker.pkg.dev/phygital-388705/dev/admin
	@echo "Started admin-frontend http://localhost:3111"

build-item:
	docker build --build-arg APP=item -t asia-southeast1-docker.pkg.dev/phygital-388705/dev/item .
run-item: build-item
	docker rm -f item-frontend && docker run -d --name item-frontend -p 3222:3000 asia-southeast1-docker.pkg.dev/phygital-388705/dev/item
	@echo "Started item-frontend http://localhost:3222"

build-marketplace:
	docker build --build-arg APP=marketplace -t asia-southeast1-docker.pkg.dev/phygital-388705/dev/marketplace .
run-marketplace: build-marketplace
	docker rm -f marketplace-frontend && docker run -d --name marketplace-frontend -p 3333:3000 asia-southeast1-docker.pkg.dev/phygital-388705/dev/marketplace
	@echo "Started marketplace-frontend http://localhost:3333"

build-nomion:
	docker build --build-arg APP=nomion -t asia-southeast1-docker.pkg.dev/phygital-388705/dev/nomion .
run-nomion: build-nomion
	docker rm -f nomion-frontend && docker run -d --name nomion-frontend -p 3444:3000 asia-southeast1-docker.pkg.dev/phygital-388705/dev/nomion
	@echo "Started nomion-frontend http://localhost:3444"

build-phygilabs:
	docker build --build-arg APP=phygilabs -t asia-southeast1-docker.pkg.dev/phygital-388705/dev/phygilabs .
run-phygilabs: build-phygilabs
	docker rm -f phygilabs-frontend && docker run -d --name phygilabs-frontend -p 3555:3000 asia-southeast1-docker.pkg.dev/phygital-388705/dev/phygilabs
	@echo "Started phygilabs-frontend http://localhost:3555"
