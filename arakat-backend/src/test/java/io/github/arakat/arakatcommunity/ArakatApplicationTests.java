package io.github.arakat.arakatcommunity;

import io.github.arakat.arakatcommunity.model.Node;
import io.github.arakat.arakatcommunity.repository.NodeRepository;
import io.github.arakat.arakatcommunity.service.NodeService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

//@RunWith(SpringRunner.class)
//@RunWith(MockitoJUnitRunner.class)
//@SpringBootTest
public class ArakatApplicationTests {

//	@Mock
//	NodeRepository nodeRepositoryMock;

//	@InjectMocks
//	NodeService nodeService;

	@Test
	public void contextLoads() {
	}

//	@Test
//	public void testSaveAndRetrieveNode() {
//		Node expectedNode = new Node("100", "test_node", "200");
//		nodeRepositoryMock.save(expectedNode);
//		Node actualNode = nodeRepositoryMock.findByNodeId(Integer.toString(1));
//		assertEquals(expectedNode, actualNode);
////		when(nodeRepositoryMock.save(testNode)).thenReturn(testNode);
////		assertEquals(testNode, nodeRepositoryMock.findOne("100"));
////		when(nodeRepositoryMock.save(new Node("100", "test_node", "200"))).thenReturn(nodeRepositoryMock.findByNodeId("100"));
////		assertEquals();
//	}

//	@Test
//	public void testSaveNode() {
////		when(nodeRepositoryMock.save(new Node("100", "test_node", "200"))).thenReturn(new Node());
////		when(nodeRepositoryMock.save(new Node("100", "test_node", "200")));
//
//		when()
//
////		List<Node> denemeList = new ArrayList<>();
////		denemeList.add(new Node("100", "test_node", "200"));
////		when(nodeRepositoryMock.findAll()).thenReturn(denemeList);
////		assertEquals("100", nodeRepositoryMock.findByNodeId("100"));
//	}

//	@Test
//	public void testSaveNode() {
//		when(nodeRepositoryMock.findAll()).thenReturn()
////		when(nodeRepositoryMock.save(new Node("100", "test_node", "200"))).thenReturn(nodeRepositoryMock.findByNodeId("100"));
////		assertEquals();
//	}
}
