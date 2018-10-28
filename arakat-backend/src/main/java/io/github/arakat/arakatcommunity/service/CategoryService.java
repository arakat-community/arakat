package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.model.Category;
import io.github.arakat.arakatcommunity.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public void saveCategoryUtil(List<Category> categories) {
        for (Category category : categories) {
            saveCategory(category);
        }
    }

    private Category saveCategory(Category category) {
        List<Category> children = new ArrayList<>();

        for (Category child : category.getCategories()) {
            if (child != null) {
                child.setHasParent(true);
                children.add(saveCategory(child));
            }
        }

        category.setCategories(children);
        return categoryRepository.save(category);
    }
}
