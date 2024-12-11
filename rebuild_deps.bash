

# problema
o package-log.json gerado faz algumas referencias ap pdfkit no repo antigo, tem q arrumar manualmente

#-- certifique-se
em casa subprojeto
de apagar
rm -rf package-lock.json node_modules/
npm install
npm run build
#adicionar o que mudou
git add . 
git commit --amend
git push --force


## PASSO A PASSO

# se alterar o pdfkit
cd ../pdfkit

npm run build
git add .
git commit
git push
git log

# e se alterar o pdfmake
cd ../pdfmake
rm -rf package-lock.json node_modules/
npm install
grep lucribas package-lock.json
npm run build

git add .
git commit
git push

# e se alterar o html-to-pdkmake
cd ../html-to-pdkmake

rm -rf package-lock.json node_modules/
npm install
grep lucribas package-lock.json

# teste
heaptrack node example_img_stream3.js

git add .
git commit
git push
