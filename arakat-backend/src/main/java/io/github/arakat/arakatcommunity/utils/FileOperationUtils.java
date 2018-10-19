package io.github.arakat.arakatcommunity.utils;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Component
public class FileOperationUtils {

    public void writeToFile(String file, String stringToWrite, String directoryToWrite) throws IOException {
        String currentWorkingDirectory = System.getProperty("user.dir") + directoryToWrite;

        File f = new File(currentWorkingDirectory);
        boolean makeDirResult = f.mkdirs();

        if (Files.notExists(Paths.get(currentWorkingDirectory + file), LinkOption.NOFOLLOW_LINKS)) {
            Files.createFile(Paths.get(currentWorkingDirectory + file));
        }
        Files.write(Paths.get(currentWorkingDirectory + file), stringToWrite.getBytes(), StandardOpenOption.CREATE);
    }
}
