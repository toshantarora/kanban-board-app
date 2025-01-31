import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import CardContainer from "./CardContainer";
import TaskItems from "./TaskItems";

const initialData = [
  {
    id: `container-${uuidv4()}`,
    name: "To-Do List",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Construction Tender 1",
        description: "Description goes here about the tender",
        priority: "High",
        status: "In Progress",
        dueDate: "22 Dec 24",
        commentsCount: 12,
        attachmentsCount: 1,
      },
      {
        id: `item-${uuidv4()}`,
        title: "Construction Tender 2",
        description: "Description goes here about the tender",
        status: "Not Started",
        priority: "High",
        dueDate: "22 Dec 24",
        commentsCount: 12,
        attachmentsCount: 3,
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    name: "In Progress",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Construction Tender 3",
        description: "Description goes here about the tender",
        status: "In Progress",
        priority: "Low",
        dueDate: "22 Dec 24",
        commentsCount: 12,
        attachmentsCount: 3,
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    name: "Not Started",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Construction Tender 4",
        description: "Description goes here about the tender",
        status: "In Progress",
        priority: "Low",
        dueDate: "22 Dec 24",
        commentsCount: 0,
        attachmentsCount: 0,
      },
    ],
  },
];
const KanbanBoard = () => {
  const [containers, setContainers] = useState(initialData);
  const [activeId, setActiveId] = useState(null);

  function findValueOfItems(id, type) {
    if (type === "container") {
      return containers.find((item) => item?.id === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container?.items?.find((item) => item?.id === id)
      );
    }
  }
  function findValueOfItem(id, type) {
    if (type === "container") {
      return containers.find((container) => container.id === id);
    }
    if (type === "item") {
      for (const container of containers) {
        const item = container.items.find((item) => item.id === id);
        if (item) return { ...item, containerData: container };
      }
    }
    return null;
  }

  const findContainerItems = (id) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];

    return container.items;
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;

    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }
  return (
    <div className="mx-auto max-w-8xl py-2">
      <div className="mt-5">
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col auto-cols[calc(33.333%_-_1.5rem)] gap-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={containers.map((i) => i.id)}>
                {containers.map((container) => (
                  <CardContainer
                    id={container.id}
                    key={container.id}
                    data={container}
                  >
                    <SortableContext items={container.items.map((i) => i.id)}>
                      <div className="flex items-start flex-col gap-y-4">
                        {container.items.map((i) => (
                          <TaskItems
                            id={i.id}
                            key={i.id}
                            itemsData={i}
                            containerData={container}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </CardContainer>
                ))}
              </SortableContext>

              <DragOverlay adjustScale={false}>
                {activeId && activeId.toString().includes("item") && (
                  <TaskItems
                    id={activeId}
                    itemsData={findValueOfItem(activeId, "item")}
                    containerData={
                      findValueOfItem(activeId, "item")?.containerData
                    }
                  />
                )}

                {activeId && activeId.toString().includes("container") && (
                  <CardContainer
                    id={activeId}
                    data={findValueOfItem(activeId, "container")}
                  >
                    {findContainerItems(activeId).map((i) => (
                      <TaskItems
                        key={i.id}
                        id={i.id}
                        itemsData={i}
                        containerData={findValueOfItem(activeId, "container")}
                      />
                    ))}
                  </CardContainer>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
