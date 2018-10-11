package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.Category;
import io.github.arakat.arakatcommunity.repository.CategoryRepository;
import io.github.arakat.arakatcommunity.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {

    private CategoryRepository categoryRepository;
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository, CategoryService categoryService) {
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    @RequestMapping(value = "/save-category", method = RequestMethod.POST)
    public void saveCategory(@Valid @RequestBody Category category) {
        categoryRepository.save(category);
    }

    @RequestMapping(value = "/save-multiple-categories", method = RequestMethod.POST)
    public void saveMultipleCategories(@Valid @RequestBody List<Category> categories) {
//        categoryRepository.save(categories);
        categoryService.saveCategoryUtil(categories);
    }

    @RequestMapping(value = "/get-categories", produces = { "application/json" },
            method = RequestMethod.GET)
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @RequestMapping(value = "/get-category/{categoryId}", produces = { "application/json" },
            method = RequestMethod.GET)
    public Category getCategoryById(@PathVariable("categoryId") String categoryId) {
        return categoryRepository.findOne(categoryId);
    }

    @RequestMapping(value = "/delete-categories", produces = { "application/json" },
            method = RequestMethod.DELETE)
    public void deleteCategories() {
        categoryRepository.deleteAll();
    }
}
