FROM maven:3.5.3-jdk-8 as maven

COPY ./pom.xml ./pom.xml

RUN mvn dependency:go-offline -B

COPY ./src ./src

RUN mvn package

FROM openjdk:8u171-jre-alpine

WORKDIR /usr/src/app
COPY --from=maven target/*.jar .

EXPOSE 8080

CMD java -jar *.jar