# ARAKAT Java Servisi

## Geliştirme

##### İçerik

* Java web uygulamasını geliştirmek için [Spring Boot](https://spring.io/projects/spring-boot) kullanılmıştır.
* Bağımlılık yöneticisi olarak [Maven](https://maven.apache.org/) kullanılmıştır.
* Uygulama Programlama Arayüzü(API) tanımlamak amacıyla [Swagger2.0](https://swagger.io/docs/specification/2-0/basic-structure/) kullanılmıştır.

##### Ön Gereksinimler

* JDK 1.8+
* Maven 3+

##### Çalıştırma
Uygulamayı geliştirme ortamında çalıştırmak için aşağıdaki komutu terminal'inizde çalıştırmanız gerekmektedir:

``
$ mvn spring-boot:run
``

Uygulamayı çalıştırdıktan sonra Swagger arayüzüne erişmek için

``
http://localhost:8080/arakat-java-service/swagger-ui.html
``
adresini ziyaret edebilirsiniz.

##### Dağıtım (Deployment)

Arakat Java servisi docker container'ları halinde [Docker Hub](https://hub.docker.com/) üzerinden dağıtılacaktır.

##### Sorun Giderme / Yeni Özellik İsteği

Arakat ile ilgili bir sorunuz olduğunda, bir bug bulduğunuzda ya da yeni bir özellik isteğinde bulunmak istediğinizde [GitHub/Issues](https://github.com/arakat-community/arakat/issues) sekmesini kullanabilirsiniz.