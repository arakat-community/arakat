package io.github.arakat.arakatcommunity;

import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.repository.TablePathRepository;
import io.github.arakat.arakatcommunity.service.TablePathService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.Assertions;

import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ArakatApplicationTests {

	@Mock
	TablePathRepository tablePathRepository;

	@InjectMocks
	TablePathService tablePathService;

	@Test
	public void findTablePathById() {
		TablePath tablePath = new TablePath();
		tablePath.setTablePathId(2L);
		when(tablePathRepository.findByTablePathId(anyLong())).thenReturn(tablePath);

		TablePath resultTablePath = tablePathService.getTablePathById(2L);
		Assertions.assertEquals(tablePath, resultTablePath);

		verify(tablePathRepository).findByTablePathId(2L);
	}
}
