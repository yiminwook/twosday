"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { Extensions, NodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import { v1 as uuid } from "uuid";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

// .extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(CodeBlock);
//   },
// })

export const CustomImageResize = Image.extend({
  // 확장 기능 이름 변경 (옵션)
  // 기본 이미지 속성 외에 style을 명시적으로 관리
  addOptions() {
    return {
      ...this.parent?.(),
      // HTMLAttributes는 최종 렌더링될 HTML 태그에 적용될 속성입니다.
      HTMLAttributes: {
        // class: 'resized-image', // 필요하다면 클래스 추가
      },
    };
  },

  addAttributes() {
    return {
      // 기본 속성(src, alt, title 등) 상속
      ...this.parent?.(),
      // width, height 속성은 style로 통합 관리하므로 제거하거나 null 처리
      width: { default: null, renderHTML: () => ({}), parseHTML: () => null },
      height: { default: null, renderHTML: () => ({}), parseHTML: () => null },
      // style 속성 처리 개선
      style: {
        default: null, // 기본값은 null로 설정하여 강제 스타일 적용 방지
        parseHTML: (element) => {
          // 1. element의 인라인 style (style="") 값을 우선 가져옵니다.
          const inlineStyle = element.getAttribute("style");
          // 2. width/height 속성값을 가져옵니다.
          const widthAttr = element.getAttribute("width");
          const heightAttr = element.getAttribute("height");

          let styleObject: { [key: string]: string } = {};

          // 인라인 스타일 파싱하여 객체로 변환 (간단한 파싱, 복잡한 경우 라이브러리 사용 고려)
          if (inlineStyle) {
            inlineStyle.split(";").forEach((part) => {
              const [key, value] = part.split(":");
              if (key && value) {
                styleObject[key.trim()] = value.trim();
              }
            });
          }

          // width 속성이 있고 style 객체에 width가 없으면 추가
          if (widthAttr && !styleObject["width"]) {
            styleObject["width"] = `${widthAttr}px`;
          }
          // height 속성이 있고 style 객체에 height가 없으면 추가 (width가 있을 때만 height: auto 추가 고려)
          if (heightAttr && !styleObject["height"]) {
            styleObject["height"] = `${heightAttr}px`;
          } else if (widthAttr && !styleObject["width"] && !styleObject["height"]) {
            // width 속성만 있고 height 정보가 없을 때 auto 추가
            styleObject["height"] = "auto";
          }

          // style 객체를 다시 문자열로 변환
          const finalStyle = Object.entries(styleObject)
            .map(([key, value]) => `${key}: ${value}`)
            .join("; ");

          // console.log("Parsed Style:", finalStyle || null);
          return finalStyle || null; // 최종 스타일 문자열 반환 (없으면 null)
        },
        // renderHTML은 style 속성 값이 있다면 그대로 HTML style 속성으로 출력
        renderHTML: (attributes) => {
          if (!attributes.style) {
            return {};
          }
          // style 속성이 문자열이므로 그대로 반환
          return { style: attributes.style };
        },
      },
    };
  },

  addNodeView(): NodeViewRenderer {
    // 반환 타입 명시
    return ({ node, editor, getPos }) => {
      // 파라미터 타입 명시 및 반환 타입 NodeView
      const {
        view,
        options: { editable },
      } = editor;
      // 노드의 style 속성 가져오기 (parseHTML 결과)
      const initialNodeStyle = node.attrs.style || "";

      // Node View DOM 구조 생성
      const dom = document.createElement("div"); // Wrapper div
      dom.style.display = "flex"; // 이미지 정렬을 위해 flex 사용

      const container = document.createElement("div"); // 이미지와 컨트롤러를 감싸는 div
      // container.style.display = 'inline-block'; // 컨테이너 자체는 인라인 블록처럼 동작
      container.style.lineHeight = "0"; // 이미지 하단 여백 제거
      container.style.position = "relative"; // 컨트롤러/닷 위치 기준점

      const img = document.createElement("img");

      // --- 초기 스타일 및 속성 적용 ---
      // 1. 노드의 style 속성을 img 요소에 직접 적용
      img.setAttribute("style", initialNodeStyle);
      // 2. 기타 속성 (src, alt, title) 적용
      ["src", "alt", "title"].forEach((attr) => {
        if (node.attrs[attr]) {
          img.setAttribute(attr, node.attrs[attr]);
        }
      });
      // 3. 초기 width/margin 값에 따라 container/dom 스타일 설정
      const applyLayoutStyles = (styleText: string) => {
        const styles = Object.fromEntries(
          styleText
            .split(";")
            .map((s) => s.split(":").map((p) => p.trim()))
            .filter((p) => p.length === 2),
        );
        container.style.width = styles["width"] || "auto";
        container.style.margin = styles["margin"] || "0"; // 컨테이너 마진 설정
        // dom (wrapper)의 정렬 설정
        if (styles["margin"]?.includes("auto")) {
          if (styles["margin"] === "0px auto" || styles["margin"] === "0 auto") {
            // 가운데 정렬
            dom.style.justifyContent = "center";
          } else if (styles["margin"]?.endsWith(" auto")) {
            // 오른쪽 정렬
            dom.style.justifyContent = "flex-end";
          } else {
            // 왼쪽 정렬 (기본값)
            dom.style.justifyContent = "flex-start";
          }
        } else {
          dom.style.justifyContent = "flex-start"; // 명시적 auto 없으면 왼쪽 정렬
        }
        // img 자체의 margin은 제거하거나 0으로 설정 (container가 제어)
        // img.style.margin = '0'; // 필요에 따라 주석 해제
      };
      applyLayoutStyles(initialNodeStyle); // 초기 레이아웃 적용

      container.appendChild(img);
      dom.appendChild(container);

      // --- NodeView 업데이트 로직 ---
      // ProseMirror 트랜잭션을 통해 노드 속성 업데이트
      const dispatchNodeUpdate = () => {
        if (typeof getPos === "function") {
          const pos = getPos();
          if (typeof pos === "number" && !isNaN(pos)) {
            // getPos 유효성 검사 강화
            const newAttrs = {
              ...node.attrs,
              style: img.style.cssText, // 현재 img 요소의 style을 노드 속성으로 업데이트
              // width, height 속성은 사용 안함
              width: null,
              height: null,
            };
            // console.log("Dispatching node update with attrs:", newAttrs);
            try {
              view.dispatch(view.state.tr.setNodeMarkup(pos, null, newAttrs));
            } catch (error) {
              console.error("Error dispatching node update:", error);
            }
          } else {
            console.warn("Invalid position received from getPos:", pos);
          }
        }
      };

      // --- 정렬 컨트롤러 ---
      const iconStyle =
        "width: 24px; height: 24px; cursor: pointer; opacity: 1; transition: opacity 0.2s;";
      const iconHoverStyle = "opacity: 0.5;";
      let positionController: HTMLDivElement | null = null; // 컨트롤러 참조 저장

      const paintPositionController = () => {
        if (positionController) positionController.remove(); // 기존 컨트롤러 제거

        positionController = document.createElement("div");
        positionController.setAttribute(
          "style",
          "position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 10; background-color: rgba(255, 255, 255, 0.8); border-radius: 4px; border: 1px solid #ccc; display: flex; gap: 8px; padding: 4px 8px; cursor: default;",
        );

        const createButton = (src: string, marginValue: string) => {
          // 파라미터 이름 변경 (margin -> marginValue)
          const button = document.createElement("img");
          button.src = src;
          button.style.cssText = iconStyle;
          button.addEventListener("mouseover", () => (button.style.opacity = "0.5"));
          button.addEventListener("mouseout", () => (button.style.opacity = "1"));
          button.addEventListener("click", (e) => {
            e.stopPropagation(); // 이벤트 버블링 중단

            // ---- 수정된 부분 시작 ----
            // 1. 현재 너비 값을 가져옵니다. (리사이즈는 container 너비를 변경했으므로 container 기준)
            const currentWidth = container.style.width;
            // ---- 수정된 부분 끝 ----

            // 2. img 요소에 새로운 margin 값을 설정합니다.
            img.style.margin = marginValue;

            // ---- 수정된 부분 시작 ----
            // 3. 가져온 현재 너비 값을 img 요소에 다시 적용합니다.
            //    (container.style.width가 'auto'나 빈 값이 아닐 때만 적용)
            if (currentWidth && currentWidth !== "auto") {
              img.style.width = currentWidth;
              img.style.height = "auto"; // 높이는 자동으로 유지
            } else {
              // 리사이즈되지 않은 초기 상태 등 currentWidth가 유효하지 않으면
              // 너비를 100%로 설정하거나 다른 기본값을 적용할 수 있습니다.
              // 여기서는 100%로 설정해봅니다 (컨테이너 기준).
              img.style.width = "100%";
              img.style.height = "auto";
            }
            // ---- 수정된 부분 끝 ----

            // 4. 변경된 img 스타일 기준으로 레이아웃(dom, container)을 업데이트합니다.
            applyLayoutStyles(img.style.cssText);

            // 5. 최종적으로 완성된 img 스타일을 노드 데이터에 반영합니다.
            dispatchNodeUpdate();
          });
          return button;
        };

        positionController.appendChild(
          createButton(
            "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_left/default/20px.svg",
            "0 auto 0 0",
          ),
        ); // 왼쪽
        positionController.appendChild(
          createButton(
            "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_center/default/20px.svg",
            "0 auto",
          ),
        ); // 가운데
        positionController.appendChild(
          createButton(
            "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_right/default/20px.svg",
            "0 0 0 auto",
          ),
        ); // 오른쪽

        container.appendChild(positionController); // 컨테이너에 컨트롤러 추가
      };

      // --- 리사이즈 핸들러 (닷) ---
      const resizeDots: HTMLDivElement[] = []; // 닷 참조 저장
      const paintResizeDots = () => {
        // 기존 닷 제거
        while (resizeDots.length) resizeDots.pop()?.remove();

        const isMobile = document.documentElement.clientWidth < 768;
        const dotSize = isMobile ? 16 : 9;
        const dotPositionOffset = isMobile ? -8 : -4; // 위치 오프셋
        const dotsPositions = [
          `top: ${dotPositionOffset}px; left: ${dotPositionOffset}px; cursor: nwse-resize;`, // TL
          `top: ${dotPositionOffset}px; right: ${dotPositionOffset}px; cursor: nesw-resize;`, // TR
          `bottom: ${dotPositionOffset}px; right: ${dotPositionOffset}px; cursor: nwse-resize;`, // BR
          `bottom: ${dotPositionOffset}px; left: ${dotPositionOffset}px; cursor: nesw-resize;`, // BL
        ];

        Array.from({ length: 4 }).forEach((_, index) => {
          const dot = document.createElement("div");
          dot.setAttribute(
            "style",
            `position: absolute; width: ${dotSize}px; height: ${dotSize}px; border: 1.5px solid #6C6C6C; border-radius: 50%; background-color: white; z-index: 10; ${dotsPositions[index]}`,
          );

          let isResizing = false;
          let startX: number, startWidth: number;

          const onPointerDown = (clientX: number) => {
            isResizing = true;
            startX = clientX;
            startWidth = container.offsetWidth; // 컨테이너 너비 기준
            // 리사이징 중에는 컨트롤러 숨기기 (옵션)
            if (positionController) positionController.style.display = "none";
            document.addEventListener("mousemove", onPointerMove);
            document.addEventListener("mouseup", onPointerUp, { once: true });
            document.addEventListener("touchmove", onPointerMove, { passive: false });
            document.addEventListener("touchend", onPointerUp, { once: true });
          };

          const onPointerMove = (e: MouseEvent | TouchEvent) => {
            if (!isResizing) return;
            e.preventDefault(); // 스크롤 방지 (터치)

            const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
            // index 0, 3 (왼쪽 닷): 반대 방향, index 1, 2 (오른쪽 닷): 같은 방향
            const deltaX = index === 0 || index === 3 ? -(currentX - startX) : currentX - startX;
            const newWidth = Math.max(50, startWidth + deltaX); // 최소 너비 50px

            container.style.width = `${newWidth}px`; // 컨테이너 너비 변경
            img.style.width = "100%"; // 이미지는 항상 컨테이너에 꽉 차게
            img.style.height = "auto"; // 높이는 자동으로
          };

          const onPointerUp = () => {
            if (!isResizing) return;
            isResizing = false;
            // 컨트롤러 다시 표시
            if (positionController) positionController.style.display = "flex";
            document.removeEventListener("mousemove", onPointerMove);
            document.removeEventListener("touchmove", onPointerMove);
            // height: auto 적용된 최종 스타일 업데이트
            img.style.width = "100%"; // 명시적으로 설정
            img.style.height = "auto";
            dispatchNodeUpdate(); // 노드 업데이트
          };

          dot.addEventListener("mousedown", (e) => {
            e.preventDefault();
            onPointerDown(e.clientX);
          });
          dot.addEventListener(
            "touchstart",
            (e) => {
              e.cancelable && e.preventDefault();
              onPointerDown(e.touches[0].clientX);
            },
            { passive: false },
          );

          container.appendChild(dot);
          resizeDots.push(dot);
        });
      };

      // --- 편집 모드 활성화/비활성화 로직 ---
      let isActive = false; // 현재 활성화 상태
      const activate = () => {
        if (isActive || !editable) return;
        isActive = true;
        container.style.border = "1px dashed #6C6C6C";
        paintPositionController();
        paintResizeDots();
        // 다른 이미지 비활성화 (선택 사항)
        document.querySelectorAll(".ProseMirror-selectednode").forEach((el) => {
          if (el !== dom) el.classList.remove("ProseMirror-selectednode");
        });
        dom.classList.add("ProseMirror-selectednode");
      };

      const deactivate = () => {
        if (!isActive) return;
        isActive = false;
        container.style.border = "none";
        positionController?.remove();
        positionController = null;
        while (resizeDots.length) resizeDots.pop()?.remove();
        dom.classList.remove("ProseMirror-selectednode");
      };

      // --- 이벤트 리스너 ---
      // 이미지 클릭 시 활성화
      dom.addEventListener("click", (e) => {
        if (!editable) return;
        // 컨트롤러 클릭은 제외
        if ((e.target as HTMLElement).closest('div[style*="position: absolute"]')) {
          return;
        }
        activate();
      });

      // 에디터 외부 클릭 시 비활성화
      const handleClickOutside = (event: MouseEvent) => {
        if (!dom.contains(event.target as Node)) {
          deactivate();
        }
      };

      // --- 편집 가능할 때만 활성화 로직 및 외부 클릭 리스너 추가 ---
      if (editable) {
        document.addEventListener("click", handleClickOutside, true); // Capture phase
      }

      // --- NodeView 인터페이스 반환 ---
      return {
        dom, // 최상위 DOM 요소
        contentDOM: undefined, // 내용이 없는 노드
        ignoreMutation: () => true, // 내부 DOM 변경은 직접 처리하므로 뮤테이션 무시
        update: (updatedNode: ProseMirrorNode): boolean => {
          if (updatedNode.type !== node.type) return false; // 타입 변경 시 업데이트 불가

          // 노드 속성 변경 시 img 속성 및 스타일 업데이트
          node = updatedNode; // 내부 노드 참조 업데이트
          const newStyle = node.attrs.style || "";
          img.setAttribute("style", newStyle);
          ["src", "alt", "title"].forEach((attr) => {
            if (node.attrs[attr]) img.setAttribute(attr, node.attrs[attr]);
            else img.removeAttribute(attr);
          });
          applyLayoutStyles(newStyle); // 레이아웃 재적용

          return true; // 업데이트 성공
        },
        destroy: () => {
          // 외부 클릭 리스너 제거 등 정리 작업
          if (editable) {
            document.removeEventListener("click", handleClickOutside, true);
          }
          // console.log("NodeView destroyed");
        },
        // selectNode, deselectNode (선택 시/해제 시 동작 정의 - activate/deactivate 호출 등)
        selectNode: () => {
          if (editable) activate();
        },
        deselectNode: () => {
          if (editable) deactivate();
        },
      };
    }; // end of NodeView function
  }, // end of addNodeView
});

export const extensions: Extensions = [
  StarterKit.configure({
    codeBlock: false,
    // code: false,
    heading: {
      HTMLAttributes: {
        id: uuid(),
      },
    },
  }),
  Underline,
  Superscript,
  SubScript,
  Highlight,
  // Image,
  // ImageResize,
  CustomImageResize,
  CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Youtube,
  Link.configure({
    // openOnClick: false, //편집기중은 비활성화
    autolink: true,
    linkOnPaste: false,
    validate: (href) => /^https?:\/\//.test(href),
    HTMLAttributes: { target: "_blank" },
  }),
  TextStyle, // 컬러변경을 위해 필요
  Color,
];
