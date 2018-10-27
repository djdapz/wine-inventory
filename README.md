#Wine Inventory

##Backend
Must have 
    
    -Docker
    -Java
    -Gradle

To Run: 

1) User Docker to start up the db
2) Build the jar
3) Execute the jar

````
docker-compose up -d 
./gradlew assemble
java -jar build/libs/wine-inventory-1.0-SNAPSHOT.jar
````


##Frontend
Must have 
    
    -Npm / Node

````
cd frontend
npm install
npm install
npm run serve
````