#指定基础镜像，在其上进行定制
FROM nginx:latest

#复制同级路径下的dist文件夹中的所有文件到容器里
#dist文件为vue打包后上传到服务器的解压包
COPY ../dist/ /usr/share/nginx/html/
#复制nginx配置文件，替换nginx容器中的默认配置
COPY default.conf /etc/nginx/conf.d/default.conf
