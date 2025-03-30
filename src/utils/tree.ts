// 1) DB에서 받아올(또는 DTO로 정의할) 카테고리 기본 구조
export interface CategoryTree {
  categoryId: number;
  parentId: number | null;
  categoryName: string;
  postCount: number;

  // 트리 구조를 만들기 위해 children을 추가 (Optional로 선언)
  children: CategoryTree[];
}

export function buildCategoryTree(
  categories: {
    categoryId: number;
    parentId: number | null;
    categoryName: string;
    postCount: number;
  }[],
): CategoryTree[] {
  // 1) id -> Category 객체를 빠르게 찾기 위해서 map 생성
  const map: Record<number, CategoryTree> = {};

  // 2) 각각의 카테고리에 children 배열을 초기화한 후, map에 등록
  categories.forEach((cat) => {
    map[cat.categoryId] = {
      ...cat,
      children: [],
    }; // id를 key로 해서 map에 저장
  });

  // 3) 최상위 루트 노드를 담을 배열
  const roots: CategoryTree[] = [];

  // 4) 모든 카테고리를 돌면서, parentId를 통해 부모-자식을 연결
  categories.forEach((cat) => {
    if (cat.parentId === null) {
      // parentId가 null이면 최상위 루트
      roots.push(map[cat.categoryId]);
    } else {
      // parentId가 있으면, map에서 부모를 찾아 children에 추가
      const parent = map[cat.parentId];
      if (parent) {
        parent.children?.push(map[cat.categoryId]);
      }
    }
  });

  // 5) 최종적으로 루트 배열을 반환 (각 루트는 children에 자식들을 재귀적으로 갖게 됨)
  return roots;
}
