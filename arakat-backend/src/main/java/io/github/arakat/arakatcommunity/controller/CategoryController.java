package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.model.Category;
import io.github.arakat.arakatcommunity.repository.CategoryRepository;
import io.github.arakat.arakatcommunity.service.CategoryService;

import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

    private CategoryRepository categoryRepository;
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository, CategoryService categoryService) {
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    @RequestMapping(value = "/save-multiple-categories", method = RequestMethod.POST)
    public ResponseEntity<BaseResponse> saveMultipleCategories(@Valid @RequestBody List<Category> categories) {
        categoryService.saveCategoryUtil(categories);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save multiple categories"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save multiple categories", "Category"),
                null, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-categories", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<Category> resultCategories = new ArrayList<>();

        for (Category category : categories)
            if (!category.hasParent())
                resultCategories.add(category);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get all categories"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get all categories", "Category"),
                resultCategories, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-category/{categoryId}", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getCategoryById(@PathVariable("categoryId") Long categoryId) {
        Optional<Category> foundCategory = categoryRepository.findById(categoryId);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get category by id"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get category by id", "Category"),
                foundCategory, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-categories", produces = { "application/json" },
            method = RequestMethod.DELETE)
    public ResponseEntity<BaseResponse> deleteCategories() {
        categoryRepository.deleteAll();

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Delete all categories"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Delete all categories", "Category"),
                null, HttpStatus.OK);
    }
}
