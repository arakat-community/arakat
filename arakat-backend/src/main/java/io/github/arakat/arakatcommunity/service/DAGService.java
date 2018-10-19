package io.github.arakat.arakatcommunity.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DAGService {

//    public List<String> getListOfTaskIds(String dag) {
//        List<String> splitDag = split(dag, "task_id");
//        List<String> listOfTaskIds = new ArrayList<>();
//
//        StringBuilder taskIdBuilder = new StringBuilder();
//
//        List<String> temp = splitDag.subList(1, splitDag.size());
//
//        for (String task : temp) {
//            List<String> deneme = split(task, ",");
//            for (char c : deneme.get(0).toCharArray()) {
//                if (c != '"' && c!= '=')
//                    taskIdBuilder.append(c);
//            }
//            listOfTaskIds.add(taskIdBuilder.toString());
//            taskIdBuilder = new StringBuilder();
//        }
//
//        return listOfTaskIds;
//    }
//
//    public String getDagId(String dag) {
//        List<String> splitDag = split(dag, "=");
//        List<String> splitDag2 = split(splitDag.get(1), "\"");
//        StringBuilder dagIdBuilder = new StringBuilder();
//
//        for (char c : splitDag2.get(1).toCharArray()) {
//            if(c != '\"')
//                dagIdBuilder.append(c);
//        }
//
//        return dagIdBuilder.toString();
//    }
//
//    private List<String> split(String str, String separator) {
//        return Stream.of(str.split(separator))
//                .map (String::new)
//                .collect(Collectors.toList());
//    }

//    public void writeDagToFile(String filePath, ) {
//
//    }

//    public String getDagId(String dag) {
//
//    }
//
//    public List<String> getTaskIds(String dag) {
//
//    }
}
