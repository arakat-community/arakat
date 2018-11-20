package io.github.arakat.arakatcommunity.utils;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FileOperationUtils {

    public void writeToFile(String file, String stringToWrite, String directoryToWrite) throws IOException {
        File f = new File(directoryToWrite);
        boolean makeDirResult = f.mkdirs();

        if (Files.notExists(Paths.get(directoryToWrite + file), LinkOption.NOFOLLOW_LINKS)) {
            Files.createFile(Paths.get(directoryToWrite + file));
        }

        Files.write(Paths.get(directoryToWrite + file), stringToWrite.getBytes(), StandardOpenOption.CREATE);
    }

    public String readFileAsString(String file) throws IOException {
        return new String(Files.readAllBytes(Paths.get(file)));
    }

    public String readFileInDirectory(File folder) {
        try {

            List<File> files = Files.walk(Paths.get(folder.toString()))
                    .filter(Files::isRegularFile)
                    .map(Path::toFile)
                    .collect(Collectors.toList());

            return files.get(0).toString();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
