// 平滑滚动到锚点
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// 导航链接点击事件
document.addEventListener('DOMContentLoaded', function() {
    // 为导航链接添加点击事件
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // 按钮点击事件
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                alert('欢迎使用我们的服务！请稍后，我们将为您转接到注册页面。');
            } else {
                smoothScroll('#about');
            }
        });
    });

    // 添加滚动时的导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 服务卡片动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察服务卡片
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 页面加载时的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl + 1: 回到首页
    if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        smoothScroll('#home');
    }
    // Ctrl + 2: 跳转到服务
    if (e.ctrlKey && e.key === '2') {
        e.preventDefault();
        smoothScroll('#services');
    }
    // Ctrl + 3: 跳转到关于
    if (e.ctrlKey && e.key === '3') {
        e.preventDefault();
        smoothScroll('#about');
    }
});

// 响应式导航菜单（移动端）
function initMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // 创建汉堡菜单按钮
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '☰';
    hamburger.className = 'hamburger-menu';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #2563eb;
    `;
    
    navContainer.appendChild(hamburger);
    
    // 切换菜单显示
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // 响应式处理
    function handleResize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            navMenu.style.display = 'none';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            hamburger.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
            navMenu.style.background = 'transparent';
            navMenu.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化
}

// 初始化移动菜单
document.addEventListener('DOMContentLoaded', initMobileMenu);