package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.exception.HdfsFileNotFoundException;
import io.github.arakat.arakatcommunity.exception.UnsupportedDataSourceException;
import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.repository.TablePathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class TablePathService {

    private IdSequenceService idSequenceService;
    private TablePathRepository tablePathRepository;
    private SparkService sparkService;

    @Autowired
    public TablePathService(IdSequenceService idSequenceService, TablePathRepository tablePathRepository,
                            SparkService sparkService) {
        this.idSequenceService = idSequenceService;
        this.tablePathRepository = tablePathRepository;
        this.sparkService = sparkService;
    }

    public TablePath saveAndGetTable(String tablePath) {
        if (exists(tablePath)) {
            return getTablePathByName(tablePath);
        }

        TablePath tableToSave = new TablePath();

        tableToSave.setTablePathId(idSequenceService.getNextSequence("TablePath"));
        tableToSave.setTablePath(tablePath);
        tablePathRepository.save(tableToSave);

        return tableToSave;
    }

    public List<String> getColumnsByTablePath(String tablePath) throws UnsupportedDataSourceException {
        return sparkService.getColumnListByTablePath(tablePath);
    }

    private boolean exists(String tablePath) {
        return tablePathRepository.findByTablePath(tablePath) != null;
    }

    private TablePath getTablePathByName(String tablePath) {
        return tablePathRepository.findByTablePath(tablePath);
    }
}
