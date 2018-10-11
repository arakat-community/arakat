package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.controller.NodeController;
import io.github.arakat.arakatcommunity.model.Category;
import io.github.arakat.arakatcommunity.model.Node;
import io.github.arakat.arakatcommunity.repository.CategoryRepository;
import io.github.arakat.arakatcommunity.repository.NodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NodeService {

    private CategoryRepository categoryRepository;
    private NodeRepository nodeRepository;

    private Logger logger = LoggerFactory.getLogger(NodeController.class);

    @Autowired
    public NodeService(CategoryRepository categoryRepository, NodeRepository nodeRepository) {
        this.categoryRepository = categoryRepository;
        this.nodeRepository = nodeRepository;
    }

    public void save(Node node) {
        String categoryId = node.getCategoryId();

        List<Category> categories = categoryRepository.findAll();

        Category resultCategory = searchForIndex(categories, categoryId);

        nodeRepository.save(node);

        resultCategory.getNodes().add(node);

        categoryRepository.save(resultCategory);
    }

    private Category searchForIndex(List<Category> categories, String categoryId) {
        Category childCategory = null;

        for(int i = 0 ; i < categories.size() && childCategory == null; i++) {
            Category category = categories.get(i);

            if(checkForCategoryId(categoryId, category.getCategoryId())) {
                logger.info("Category ID: " + category.getCategoryId());
                return category;
            }

            childCategory = searchForIndex(category.getCategories(), categoryId);
        }

        return childCategory;
    }

    private Boolean checkForCategoryId(String nodeCategoryId, String originalCategoryId) {
        return nodeCategoryId.equalsIgnoreCase(originalCategoryId);
    }
}
