# ARAKAT Java Servisi

## Geliştirme

##### Java Servisinin Rolü


##### İçerik

* Java web uygulamasını geliştirmek için [Spring Boot](https://spring.io/projects/spring-boot) kullanılmıştır.
* Bağımlılık yöneticisi olarak [Maven](https://maven.apache.org/) kullanılmıştır.
* Uygulama Programlama Arayüzü(API) tanımlamak amacıyla [Swagger2.0](https://swagger.io/docs/specification/2-0/basic-structure/) kullanılmıştır.
* Core taraftaki(Python) _node_spec_'leri, _family_'leri ve _category_'leri tutmak için [MongoDB](https://www.mongodb.com/) kullanılmıştır.
* 

##### Ön Gereksinimler

* JDK 1.8+
* Maven 3+
* MongoDB 3.2.21+

##### Çalıştırma
Uygulamayı geliştirme ortamında çalıştırmak için terminalinizde projenin en üst dizininde aşağıdaki komutu çalıştırmanız gerekmektedir:

``
$ mvn spring-boot:run
``

**Örnek Çalıştırma**

![mvn spring-boot:run GIF](img/arakat-backend-run.gif)

Uygulamayı çalıştırdıktan sonra Swagger arayüzüne erişmek için

``
http://localhost:8080/arakat-java-service/swagger-ui.html
``
adresini ziyaret edebilirsiniz.

##### Dağıtım (Deployment)

Arakat Java servisi docker container'ları halinde [Docker Hub](https://hub.docker.com/) üzerinden dağıtılacaktır.

##### Sorun Giderme / Yeni Özellik İsteği

Arakat ile ilgili bir sorunuz olduğunda, bir bug bulduğunuzda ya da yeni bir özellik isteğinde bulunmak istediğinizde [GitHub/Issues](https://github.com/arakat-community/arakat/issues) sekmesini kullanabilirsiniz.