package io.github.arakat.arakatcommunity.repository;

import io.github.arakat.arakatcommunity.model.Family;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FamilyRepository extends MongoRepository<Family, Long> {

    Family findByFamilyId(Long familyId);
}
