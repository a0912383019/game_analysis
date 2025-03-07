# sh 0306.sh dev
buildenv=$1

imagePath="frontend_vue_game:dev_0307_0955"
containerName=dev-game-frontend

echo -e "\n-----------------------------\n"

echo -e "\033[35m \nstop docker containger .... \033[0m"
docker stop $containerName
docker rm $containerName
echo -e "\033[35m \ndelete docker containger .... \033[0m"

cp -v -r build_config/vite.config.js .

echo -e "\033[35m \ndocker build --build-arg=buildenv=$buildenv -t ${imagePath} . \033[0m"
docker build --build-arg=buildenv=dev -t ${imagePath} .
# echo -e "\033[35m \ndocker push ${imagePath} \033[0m"
# docker push $imagePath

docker run -p 8902:80 -d --name dev-game-frontend $imagePath

echo -e "\033[35m \ndone \033[0m"




