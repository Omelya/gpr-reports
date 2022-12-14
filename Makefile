APP = gpr-reports-front

.PHONY: install
install:
	docker exec $(APP) npm install

.PHONY: bash
bash:
	docker exec -it $(APP) bash