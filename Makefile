APP = gpr-reports-front

.PHONY: install
install:
	npm install

.PHONY: bash
bash:
	docker exec -it $(APP) bash