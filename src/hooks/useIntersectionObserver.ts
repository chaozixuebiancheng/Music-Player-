// 分页加载或者延迟加载底层逻辑，判断最后一个元素是否在视口内
interface Options {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    pageSize: number;
    initialPageNum: number;
}
// eslint-disable-next-line no-unused-vars
type Callback = (pageNum: number, pageSize: number) => void;
// 参数（元素实例，，回调函数）
export function useIntersectionObserver(
    elementRef: Ref<Element | undefined | Element[]>, // 对目标元素的引用
    {
        threshold = 0.1, // 阈值，即当目标元素进入视口的比例到达多少时，出发回调
        root = null, // 观察的根元素，默认是浏览器的可视区域
        rootMargin = "0px", // 根元素的外边距
        pageSize, // 每页加载的数据量
        initialPageNum, // 初始页码
    }: Options,
    callback: Callback, // 回调函数，当指定元素进入视口后触发
) {
    const pageNum = ref(initialPageNum ?? 1); // 当前的页码，当懒加载出发后自增
    const isLastElementMap = new Map<Element, boolean>(); // 记录当前页中的最后一个元素

    // 创建IntersectionObserver实例，这是浏览器自带的API
    const observer = new IntersectionObserver(
        // 参数为目标元素的数组和自身
        (entries, observer) => {
            entries.forEach((entry) => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    // 元素进入视口后的动画处理
                    // element.classList.remove("opaque");
                    // element.classList.add("come-in");

                    // 检查当前元素是否为数组中的最后一个元素
                    const isLastElement = isLastElementMap.get(element) || false;
                    if (isLastElement) {
                        console.log('要触发回调函数了')
                        callback(pageNum.value, pageSize);
                        pageNum.value++; // 只有最后一个元素触发时页码自增
                        // 如果需要，可以在这里取消该元素的观察
                        observer.unobserve(element);
                    }
                }
            });
        },
        { threshold, root, rootMargin },
    );
    //使用watchEffect函数，主要侦听elementRef.value的变化,最开始就会执行一次
    watchEffect(() => {
        observer.disconnect(); //断开正在观察的元素
        isLastElementMap.clear(); // 清空之前保存的最后一个元素

        const elements = Array.isArray(elementRef.value)
            ? elementRef.value
            : [elementRef.value];
        const lastElementIndex = elements.length - 1;// 获取最后一个元素

        elements.forEach((el, index) => {
            if (el) {
                // 初始化时添加opaque类
                // el.classList.add("opaque");
                observer.observe(el); // 开启对该元素的观察
                // 标记当前元素是否为数组中的最后一个元素
                const isLastElement = index === lastElementIndex;
                isLastElementMap.set(el, isLastElement);
            }
        });
    });

    onUnmounted(() => {
        observer.disconnect(); // 断开正在观察的元素
        isLastElementMap.clear(); // 清空之前保存的最后一个元素
    });

    return { pageNum };
}