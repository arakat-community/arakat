package io.github.arakat.arakatcommunity.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "family")
public class Family {

    @Id
    private String familyId;
    private String name;
    private List<Integer> incompatibleFamilies;

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getIncompatibleFamilies() {
        return incompatibleFamilies;
    }

    public void setIncompatibleFamilies(List<Integer> incompatibleFamilies) {
        this.incompatibleFamilies = incompatibleFamilies;
    }
}
