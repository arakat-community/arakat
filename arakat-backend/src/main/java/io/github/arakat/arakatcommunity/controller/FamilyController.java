package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.Family;
import io.github.arakat.arakatcommunity.repository.FamilyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class FamilyController {

    private FamilyRepository familyRepository;

    @Autowired
    public FamilyController(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

    @RequestMapping(value = "/save-family", method = RequestMethod.POST)
    public void saveNode(@Valid @RequestBody Family family) {
        familyRepository.save(family);
    }

    @RequestMapping(value = "/get-families", produces = { "application/json" },
            method = RequestMethod.GET)
    public List<Family> getFamilies() {
        return familyRepository.findAll();
    }

    @RequestMapping(value = "/get-family/{familyId}", produces = { "application/json" },
            method = RequestMethod.GET)
    public Family getFamilyById(@PathVariable("familyId") Long familyId) {
        return familyRepository.findByFamilyId(familyId);
    }
}
