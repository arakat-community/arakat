package io.github.arakat.arakatcommunity.repository;

import io.github.arakat.arakatcommunity.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, Long> {

}
