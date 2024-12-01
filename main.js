const SUCCESS_ICON_URL = 'https://s1.imagehub.cc/images/2024/12/01/a3500617999faf3a852f2d53c3a3ab8d.png';

function submitRepairForm() {
    const repairId = document.getElementById('repairId').value;
    const repairDate = document.getElementById('repairDate').value;
    const repairTime = document.getElementById('repairTime').value;
    const repairReason = document.getElementById('repairReason').value;
    
    if (!repairDate || !repairTime || !repairReason.trim()) {
        alert('请填写完整的补卡信息');
        return;
    }
    
    // 显示成功提示
    const modal = document.getElementById('repairModal');
    const modalMessage = document.getElementById('repairModalMessage');
    modalMessage.innerHTML = `
        <div class="success-icon">
            <img src="${SUCCESS_ICON_URL}" alt="success">
        </div>
        <span class="success-text">提交成功！</span><br><br>
        您已提交补卡申请，请您耐心等待审批...
    `;
    modal.style.display = 'flex';
    
    backToClockPage();
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        // 确保显示消息页面
        switchPage('message');
    }
}

// 登录函数
function login() {
    const workId = document.getElementById('workId').value;
    const password = document.getElementById('password').value;

    if(workId === '12001' && password === '122388') {
        // 保存登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userWorkId', workId);
        
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        
        // 确保显示消息页面
        switchPage('message');
    } else {
        alert('工号或密码错误');
    }
}

// 退出登录功能
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userWorkId');
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// 打卡页面相关功能
function showClockPage() {
    document.getElementById('workspacePage').style.display = 'none';
    document.getElementById('clockPage').style.display = 'block';
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function backToWorkspace() {
    document.getElementById('clockPage').style.display = 'none';
    document.getElementById('workspacePage').style.display = 'block';
}

function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    timeElement.textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
    dateElement.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
}

// 为打卡图标添加点击事件
document.querySelector('.function-item:last-child').addEventListener('click', showClockPage);

// 激励话语数组
const motivationalPhrases = [
    "新的一天，新的开始！加油！",
    "早安打卡，为梦想启航！",
    "今天也要元气满满哦！",
    "又是充满希望的一天！",
    "带着微笑开启美好的一天！",
    "今天也要保持热爱，奔赴山海！",
    "努力的人最幸运，加油！",
    "保持热爱，奋斗不止！",
    "今天也要继续加油呀！",
    "愿你带着光芒出发！"
];

function getRandomPhrase() {
    const index = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[index];
}

function showModal(message) {
    const modal = document.getElementById('clockModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('clockModal').style.display = 'none';
}

function clockIn() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
    const message = `姓名：姚家荣\n工号：12001\n部门：总经办\n打卡时间：${timeString}\n\n${getRandomPhrase()}`;
    showModal(message);
    addClockRecord('上班打卡', now);
}

function clockOut() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
    const message = `姓名：姚家荣\n工号：12001\n部门：总经办\n打卡时间：${timeString}\n\n${getRandomPhrase()}`;
    showModal(message);
    addClockRecord('下班打卡', now);
}

function addClockRecord(type, time) {
    const recordsList = document.getElementById('clockRecords');
    const record = document.createElement('div');
    record.className = 'record-item';
    record.innerHTML = `
        <span class="record-date">${time.toLocaleDateString()}</span>
        <span class="record-time">${type} ${time.toLocaleTimeString()}</span>
    `;
    recordsList.insertBefore(record, recordsList.firstChild);
}

// 补卡申请关功能
function generateRepairId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `BK${year}${month}${day}${random}`;
}

function showRepairForm() {
    document.getElementById('clockPage').style.display = 'none';
    document.getElementById('repairPage').style.display = 'block';
    document.body.style.overflow = '';
    // 生成并设置申请编号
    document.getElementById('repairId').value = generateRepairId();
    
    // 设置申请时间为当前时间
    const now = new Date();
    const currentTime = now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    document.getElementById('applyTime').value = currentTime;
    
    // 设置补卡日期默认值为今天
    const today = now.toISOString().split('T')[0];
    document.getElementById('repairDate').value = today;
}

function backToClockPage() {
    document.getElementById('repairPage').style.display = 'none';
    document.getElementById('clockPage').style.display = 'block';
    document.body.style.overflow = '';
}

function closeRepairModal() {
    document.getElementById('repairModal').style.display = 'none';
}

// 显示申请分类弹窗
function showApplyModal() {
    const modal = document.getElementById('applyModal');
    modal.style.display = 'flex';
}

// 关闭申请分类弹窗
function closeApplyModal() {
    document.getElementById('applyModal').style.display = 'none';
}

// 为申请图标添加点击事件
document.querySelector('.function-item:nth-child(2)').addEventListener('click', showApplyModal);

// 点击弹窗外部关闭弹窗
document.getElementById('applyModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeApplyModal();
    }
});

// 添加用户状态数组
const userStatuses = [
    { icon: 'ri-user-follow-line', text: '打工中' },
    { icon: 'ri-plane-line', text: '出差中' },
    { icon: 'ri-home-6-line', text: '请假中' },
    { icon: 'ri-team-line', text: '会议中' },
    { icon: 'ri-book-open-line', text: '培训中' }
];

// 当前状态索引
let currentStatusIndex = 0;

// 切换状态函数
function toggleStatusList() {
    const statusList = document.getElementById('statusList');
    statusList.classList.toggle('show');
}

function selectStatus(index) {
    currentStatusIndex = index;
    const status = userStatuses[currentStatusIndex];
    
    const statusTag = document.querySelector('.status-tag');
    statusTag.innerHTML = `
        <i class="${status.icon}"></i>
        <span>${status.text}</span>
        <i class="ri-arrow-down-s-line"></i>
    `;
    
    document.getElementById('statusList').classList.remove('show');
}

// 点击其他地方关闭状态列表
document.addEventListener('click', function(e) {
    const statusDropdown = document.querySelector('.status-dropdown');
    const statusList = document.getElementById('statusList');
    if (!statusDropdown.contains(e.target) && statusList.classList.contains('show')) {
        statusList.classList.remove('show');
    }
});

// 页面切换函数
function switchPage(pageName) {
    // 隐藏所有页面
    const pages = ['messagePage', 'workspacePage', 'clockPage', 'profilePage', 'repairPage', 'attendancePage', 'leavePage', 'shiftChangePage', 'scheduleRestPage', 'overtimePage', 'regulationDetailPage'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });

    // 移除所有导航项的激活状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // 显示对应的页面
    switch(pageName) {
        case 'message':
            document.getElementById('messagePage').style.display = 'block';
            document.querySelector('.nav-item[onclick="switchPage(\'message\')"]').classList.add('active');
            break;
        case 'workspace':
            document.getElementById('workspacePage').style.display = 'block';
            document.querySelector('.nav-item[onclick="switchPage(\'workspace\')"]').classList.add('active');
            updateWelcomeInfo();
            break;
        case 'contacts':
            document.getElementById('messagePage').style.display = 'block';
            document.querySelector('.nav-item[onclick="switchPage(\'message\')"]').classList.add('active');
            alert('通讯录功能开发中...');
            break;
        case 'discover':
            document.getElementById('messagePage').style.display = 'block';
            document.querySelector('.nav-item[onclick="switchPage(\'message\')"]').classList.add('active');
            alert('发现功能开发中...');
            break;
        case 'profile':
            document.getElementById('profilePage').style.display = 'block';
            document.querySelector('.nav-item[onclick="switchPage(\'profile\')"]').classList.add('active');
            break;
    }
}

// 页面加载完成后，默认显示消息页面
window.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        // 默认显示消息页面
        switchPage('message');
    }
});

// 添加手势返回相关代码
document.addEventListener('DOMContentLoaded', function() {
    const clockPage = document.getElementById('clockPage');
    let touchStartX = 0;
    let touchStartY = 0;

    clockPage.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, false);

    clockPage.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY) {
            return;
        }

        let touchEndX = e.touches[0].clientX;
        let touchEndY = e.touches[0].clientY;

        // 计算滑动距离和角度
        let xDiff = touchEndX - touchStartX;
        let yDiff = touchEndY - touchStartY;
        
        // 确保是水平滑动（而不是垂直滑动）
        if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 50) {
            // 如果是从左向右滑动超过50像素
            backToWorkspace();
            // 重置触摸起始点
            touchStartX = 0;
            touchStartY = 0;
        }
    }, false);

    clockPage.addEventListener('touchend', function() {
        touchStartX = 0;
        touchStartY = 0;
    }, false);
});

// 显示考勤申请页面
function showAttendancePage() {
    document.getElementById('applyModal').style.display = 'none';
    document.getElementById('attendancePage').style.display = 'block';
}

// 关闭勤申请页面
function closeAttendancePage() {
    document.getElementById('attendancePage').style.display = 'none';
    document.getElementById('workspacePage').style.display = 'block';
}

// 显示请假申请表单
function showLeaveForm(type) {
    document.getElementById('attendancePage').style.display = 'none';
    document.getElementById('leavePage').style.display = 'block';
    
    // 生成并设置申编号
    const leaveId = generateLeaveId();
    document.getElementById('leaveId').value = leaveId;
    
    // 设置申请时间
    const now = new Date();
    const currentTime = now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    document.getElementById('leaveApplyTime').value = currentTime;
}

// 关闭请假申请表单
function closeLeaveForm() {
    document.getElementById('leavePage').style.display = 'none';
    document.getElementById('attendancePage').style.display = 'block';
}

// 生成请假申请编号
function generateLeaveId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `QJ${year}${month}${day}${random}`;
}

// 选择请假类型
function selectLeaveType(element, type) {
    // 移除其他选项的激活状态
    document.querySelectorAll('.leave-type-item').forEach(item => {
        item.classList.remove('active');
    });
    // 添加当选项的激活状态
    element.classList.add('active');
}

// 计算请假天数
function calculateDays() {
    const startDate = new Date(document.getElementById('leaveStartTime').value);
    const endDate = new Date(document.getElementById('leaveEndTime').value);
    
    if (startDate && endDate && endDate >= startDate) {
        // 将时间设置为当天的 00:00:00，这样计算天数会更准确
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 是因为包含开始当天
        document.getElementById('leaveDuration').value = `${diffDays}天`;
    }
}

// 触发文件上传
function triggerFileUpload() {
    document.getElementById('fileUpload').click();
}

// 处理文件上传
function handleFileUpload(input) {
    const fileList = document.getElementById('fileList');
    const files = input.files;
    
    for (let file of files) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="ri-file-line"></i>
            <span class="file-name">${file.name}</span>
            <span class="delete-btn" onclick="this.parentElement.remove()">删除</span>
        `;
        fileList.appendChild(fileItem);
    }
    
    // 清空input，允许重复上传同一文件
    input.value = '';
}

// 提交请假申请
function submitLeaveForm() {
    // 表单验证
    const leaveType = document.querySelector('.leave-type-item.active');
    const startTime = document.getElementById('leaveStartTime').value;
    const endTime = document.getElementById('leaveEndTime').value;
    const reason = document.getElementById('leaveReason').value;
    
    if (!leaveType) {
        alert('请选择请假类型');
        return;
    }
    if (!startTime || !endTime) {
        alert('请选择请假时间');
        return;
    }
    if (!reason.trim()) {
        alert('请输入请假理由');
        return;
    }
    
    // 显示成功提示弹窗
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content leave-success-modal">
            <div class="success-icon">
                <img src="${SUCCESS_ICON_URL}" alt="success">
            </div>
            <div class="success-message">
                <span class="success-text">提交成功！</span><br>
                您已提交请假申请，请耐心等待审批...
            </div>
            <button class="modal-btn" onclick="closeLeaveSuccessModal(this)">确定</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 修改原有的 showAttendanceForm 函数
function showAttendanceForm(type) {
    if (type === '请假') {
        showLeaveForm();
    } else if (type === '换班') {
        showShiftChangeForm();
    } else if (type === '排休') {
        showScheduleRestForm();
    } else if (type === '加班') {
        showOvertimeForm();
    } else {
        alert(`${type}申请功能开发中...`);
    }
}

// 为考勤申请图标添加点击事件
document.querySelector('.apply-item:first-child').addEventListener('click', function() {
    showAttendancePage();
});

// 显示个人资料页面
function showPersonalInfo() {
    document.getElementById('personalInfoPage').style.display = 'block';
    calculateWorkDays(); // 计算入职天数
    calculateAge(); // 计算年龄
}

// 关闭个人资料页面
function closePersonalInfo() {
    document.getElementById('personalInfoPage').style.display = 'none';
}

// 添加个人资料页面的手势返回功能
document.addEventListener('DOMContentLoaded', function() {
    const personalInfoPage = document.getElementById('personalInfoPage');
    let touchStartX = 0;
    let touchStartY = 0;

    personalInfoPage.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, false);

    personalInfoPage.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY) {
            return;
        }

        let touchEndX = e.touches[0].clientX;
        let touchEndY = e.touches[0].clientY;

        // 计算滑动距离和角度
        let xDiff = touchEndX - touchStartX;
        let yDiff = touchEndY - touchStartY;
        
        // 确保是水平滑动（而不是垂直滑动）
        if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 50) {
            // 如果是从左向右滑动超过50像
            closePersonalInfo();
            // 重置触摸起始点
            touchStartX = 0;
            touchStartY = 0;
        }
    }, false);

    personalInfoPage.addEventListener('touchend', function() {
        touchStartX = 0;
        touchStartY = 0;
    }, false);
});

// 银行卡号自动识别函数（示例）
function getBankInfo(cardNumber) {
    const bankRules = {
        '622202': '中国工商银行',
        '622848': '中国农业银行',
        '622700': '中国建设银行',
        '622588': '中国银行',
        '622908': '中国邮政储蓄银行',
        // ... 可以添加更多银行的规则
    };

    const prefix = cardNumber.substring(0, 6);
    return bankRules[prefix] || '未知银行';
}

// 计算入职天数函数
function calculateWorkDays() {
    const joinDate = new Date('2022-12-07'); // 更新入职时间
    const today = new Date();
    
    // 将时间设置为当天的 00:00:00，这样计算天数会更准确
    joinDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 更新显示
    document.getElementById('workDays').textContent = `${diffDays}天`;
}

// 添加计算年龄函数
function calculateAge() {
    const birthDate = new Date('1993-12-23');
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // 如果还没到生日，年龄减1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // 更新显示
    document.getElementById('age').textContent = `${age}岁`;
}

// 显示调休申请表单
function showShiftChangeForm() {
    document.getElementById('attendancePage').style.display = 'none';
    document.getElementById('shiftChangePage').style.display = 'block';
    
    // 生成并设置申请编号
    const shiftChangeId = generateShiftChangeId();
    document.getElementById('shiftChangeId').value = shiftChangeId;
    
    // 设置申请时间
    const now = new Date();
    const currentTime = now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    document.getElementById('shiftChangeApplyTime').value = currentTime;
}

// 关闭调休申请表单
function closeShiftChangeForm() {
    document.getElementById('shiftChangePage').style.display = 'none';
    document.getElementById('attendancePage').style.display = 'block';
}

// 生成调休申请编号
function generateShiftChangeId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `HB${year}${month}${day}${random}`;
}

// 模拟员工数据
const employeeData = {
    '10001': { name: '张三', department: '技术部', workId: '10001' },
    '10002': { name: '李四', department: '人事部', workId: '10002' },
    '10003': { name: '王五', department: '财务部', workId: '10003' }
};

// 更新被调休人信息
function updateTargetInfo() {
    const targetSelect = document.getElementById('targetEmployee');
    const targetInfo = document.querySelector('.target-info');
    
    if (targetSelect.value) {
        const employee = employeeData[targetSelect.value];
        document.getElementById('targetWorkId').value = employee.workId;
        document.getElementById('targetDepartment').value = employee.department;
        targetInfo.style.display = 'flex';
    } else {
        targetInfo.style.display = 'none';
    }
}

// 修改选择班次函数
function selectShiftType(element, type) {
    // 移除点击事件，改为只读显示
    return;
}

// 修改根据时间自动判断班次函数
function autoSelectShiftType() {
    const startTime = document.getElementById('adjustRestStartTime').value;
    const endTime = document.getElementById('adjustRestEndTime').value;
    
    if (!startTime || !endTime) return;
    
    // 移除所有选项的激活状态
    document.querySelectorAll('.shift-type-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 判断班次
    let shiftType = '';
    if (startTime === '08:00' && endTime === '17:00') {
        shiftType = '早班';
    } else if (startTime === '12:00' && endTime === '21:00') {
        shiftType = '中班';
    } else if (startTime === '16:00' && endTime === '01:00') {
        shiftType = '晚班';
    } else if (startTime === '23:00' && endTime === '08:00') {
        shiftType = '大夜班';
    }
    
    // 激活对应的班次
    if (shiftType) {
        // 修改选择器，使用更精确的方式找到对应元素
        const shiftItems = document.querySelectorAll('.shift-type-item');
        shiftItems.forEach(item => {
            if (item.querySelector('span').textContent === shiftType) {
                item.classList.add('active');
            }
        });
    }
}

// 添加结束时间变化的监听
document.getElementById('adjustRestEndTime').addEventListener('change', function() {
    autoSelectShiftType();
});

// 修改时间选择的事件监听
document.getElementById('adjustRestStartTime').addEventListener('change', function() {
    const startTimeInput = document.getElementById('adjustRestStartTime');
    const endTimeInput = document.getElementById('adjustRestEndTime');
    
    // 根据开始时间自动设置结束时间
    switch(startTimeInput.value) {
        case '08:00':
            endTimeInput.value = '17:00';
            break;
        case '12:00':
            endTimeInput.value = '21:00';
            break;
        case '16:00':
            endTimeInput.value = '01:00';
            break;
        case '23:00':
            endTimeInput.value = '08:00';
            break;
    }
    
    autoSelectShiftType();
});

// 限制时间选择
document.getElementById('adjustRestStartTime').addEventListener('focus', function() {
    this.type = 'text';
    this.type = 'time';
    this.value = '';
});

document.getElementById('adjustRestStartTime').addEventListener('blur', function() {
    const validTimes = ['08:00', '12:00', '16:00', '23:00'];
    if (!validTimes.includes(this.value)) {
        alert('请选择有效的班次开始时间：08:00/12:00/16:00/23:00');
        this.value = '';
        document.getElementById('adjustRestEndTime').value = '';
    }
});

// 提交调休申请
function submitShiftChangeForm() {
    // 表单验证
    const targetEmployee = document.getElementById('targetEmployee').value;
    const shiftChangeDate = document.getElementById('shiftChangeDate').value;
    const shiftType = document.querySelector('.shift-type-item.active');
    const reason = document.getElementById('shiftChangeReason').value;
    
    if (!targetEmployee) {
        alert('请选择被调休人');
        return;
    }
    if (!shiftChangeDate) {
        alert('请选择调休日期');
        return;
    }
    if (!shiftType) {
        alert('请选择调休班次');
        return;
    }
    if (!reason.trim()) {
        alert('请输入调休原因');
        return;
    }
    
    // 显示成功提示弹窗
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content shift-change-success-modal">
            <div class="success-icon">
                <img src="${SUCCESS_ICON_URL}" alt="success">
            </div>
            <div class="success-message">
                <span class="success-text">提交成功！</span><br>
                您已提交换班申请，请耐心等待审批...
            </div>
            <button class="modal-btn" onclick="closeShiftChangeSuccessModal(this)">确定</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 修改模拟部门员工数据，添加当前用户
const departmentEmployees = {
    '总经办': [
        { id: '12001', name: '姚家荣', position: '总经理', avatar: 'https://s1.imagehub.cc/images/2024/12/01/2cb9218af26caa69cf1cb58b96431647.png' },
        { id: '10001', name: '张三', position: '经理', avatar: 'https://s1.imagehub.cc/images/2024/12/01/2cb9218af26caa69cf1cb58b96431647.png' },
        { id: '10002', name: '李四', position: '主管', avatar: 'https://s1.imagehub.cc/images/2024/12/01/2cb9218af26caa69cf1cb58b96431647.png' },
        { id: '10003', name: '王五', position: '专员', avatar: 'https://s1.imagehub.cc/images/2024/12/01/2cb9218af26caa69cf1cb58b96431647.png' }
    ]
};

// 显员工选择器
function showEmployeeSelector() {
    const modal = document.getElementById('employeeSelector');
    modal.style.display = 'flex';
    renderEmployeeList();
}

// 关闭员工选择器
function closeEmployeeSelector() {
    document.getElementById('employeeSelector').style.display = 'none';
}

// 修改渲染员工列表函数
function renderEmployeeList(searchText = '') {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';
    
    const currentDepartment = '总经办';
    const employees = departmentEmployees[currentDepartment];
    const currentUserId = '12001'; // 当前用户的工号
    
    employees.forEach(employee => {
        // 排除当前用户自己
        if (employee.id === currentUserId) {
            return; // 跳过当前用
        }
        
        // 修改搜索条件，支持姓名和工号搜索
        if (!searchText || 
            employee.name.includes(searchText) || 
            employee.id.includes(searchText)) {
            const item = document.createElement('div');
            item.className = 'employee-item';
            item.onclick = () => selectEmployee(employee);
            item.innerHTML = `
                <img src="${employee.avatar}" class="avatar" alt="${employee.name}">
                <div class="info">
                    <div class="name">${employee.name}（${employee.id}）·<span class="position-text">${employee.position}</span></div>
                </div>
            `;
            employeeList.appendChild(item);
        }
    });
}

// 修改搜索员工函数
function searchEmployee(value) {
    renderEmployeeList(value.trim());
}

// 选择员工
function selectEmployee(employee) {
    const targetInfo = document.querySelector('.target-info');
    targetInfo.style.display = 'flex';
    
    const selectedPerson = targetInfo.querySelector('.selected-person');
    selectedPerson.querySelector('.avatar').src = employee.avatar;
    selectedPerson.querySelector('.name').textContent = `${employee.name}（${employee.id}）·`;
    selectedPerson.querySelector('.name').innerHTML += `<span class="position-text">${employee.position}</span>`;
    selectedPerson.querySelector('.dept').textContent = '总经办';
    
    closeEmployeeSelector();
}

// 清除已选择的人员
function clearSelectedPerson() {
    const targetInfo = document.querySelector('.target-info');
    targetInfo.style.display = 'none';
}

// 修改激励语数组
const welcomeMottos = [
    "今天也要以饱满的热情投入工作！",
    "保持专注，突破自我，创造价值！",
    "积极主动，勇于担当，追求卓越！",
    "团结协作，共创佳绩，成就未来！",
    "用心工作，用智慧思考，用行动证明！",
    "每一天都是新的机会，让我们一起进步！",
    "态度决定高度，细节成就完美！",
    "以专业的态度，做专业的事情！",
    "坚持不懈，追求卓越，成就非凡！",
    "让努力成为一种习惯，让优秀成为一种态度！",
    "工作中寻找快乐，在快乐中提升自我！",
    "以终为始，从心出发，创造价值！",
    "保持学习的心态，创新的思维！",
    "用心做事，用情做人，用智慧工作！",
    "今天的努力，是明天的收获！"
];

// 更新欢迎信息
function updateWelcomeInfo() {
    // 计算入职天数
    const joinDate = new Date('2022-12-07');
    const today = new Date();
    joinDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 更新入职天数显示
    document.getElementById('welcomeWorkDays').textContent = `今天是你入职的第${diffDays}天`;
    
    // 随机选择一条激励语
    const index = Math.floor(Math.random() * welcomeMottos.length);
    document.getElementById('welcomeMotto').textContent = welcomeMottos[index];
}

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const itemCount = document.querySelectorAll('.carousel-item').length;

    // 自动轮播
    function autoSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }

    // 更新轮播图显示
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 点击指示器切换
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // 设置自动轮播间隔
    setInterval(autoSlide, 3000);
}

// 在页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', initCarousel);

// 排休申请相关功能
function showScheduleRestForm() {
    // 检查是否在开放时间内
    if (!isScheduleRestTimeOpen()) {
        showTimeNoticeModal();
        return;
    }

    document.getElementById('attendancePage').style.display = 'none';
    document.getElementById('scheduleRestPage').style.display = 'block';
    
    // 生成并设置申请编号
    const scheduleRestId = generateScheduleRestId();
    document.getElementById('scheduleRestId').value = scheduleRestId;
    
    // 设置申请时间
    const now = new Date();
    const currentTime = now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    document.getElementById('scheduleRestApplyTime').value = currentTime;

    // 初始化日期选择器
    initWeekDays();
}

// 生成排休申请编号
function generateScheduleRestId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `PX${year}${month}${day}${random}`;
}

// 当前显示的周的起始日期
let currentWeekStart = getNextMonday();

// 获取下一个周一
function getNextMonday() {
    const today = new Date();
    const day = today.getDay() || 7;
    const diff = 8 - day; // 获取到下周一的天数差
    const nextMonday = new Date(today.getTime() + diff * 24 * 60 * 60 * 1000);
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday;
}

// 初始化周日期选择器
function initWeekDays() {
    updateWeekRange();
    renderDays();
}

// 更新周范围显
function updateWeekRange() {
    const weekEnd = new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    const rangeText = `${currentWeekStart.getFullYear()}年${currentWeekStart.getMonth() + 1}月${currentWeekStart.getDate()}日 - ${weekEnd.getMonth() + 1}月${weekEnd.getDate()}日`;
    document.getElementById('weekRange').textContent = rangeText;
}

// 渲染日期格子
function renderDays() {
    const daysGrid = document.getElementById('daysGrid');
    daysGrid.innerHTML = '';
    
    const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
    const nextMonday = getNextMonday();
    const nextSunday = new Date(nextMonday.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart.getTime() + i * 24 * 60 * 60 * 1000);
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-item';
        
        // 检查日期是否在允许范围内（下一周）
        const isInRange = date >= nextMonday && date <= nextSunday;
        
        dayDiv.innerHTML = `
            <span class="weekday">周${weekdays[i]}</span>
            <span class="date">${date.getDate()}</span>
        `;
        
        if (isInRange) {
            dayDiv.onclick = () => toggleDateSelection(date, dayDiv);
        } else {
            dayDiv.classList.add('disabled');
        }
        
        daysGrid.appendChild(dayDiv);
    }
}

// 选中的日期数组
const selectedDates = new Set();

// 切换日期选择状态
function toggleDateSelection(date, element) {
    const dateStr = date.toLocaleDateString();
    if (selectedDates.has(dateStr)) {
        selectedDates.delete(dateStr);
        element.classList.remove('selected');
    } else {
        selectedDates.add(dateStr);
        element.classList.add('selected');
    }
    updateSelectedDatesDisplay();
}

// 更新已选择日期显示
function updateSelectedDatesDisplay() {
    const container = document.getElementById('selectedDates');
    container.innerHTML = Array.from(selectedDates).map(dateStr => {
        const date = new Date(dateStr);
        const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
        return `<div class="selected-date-item">您已选择${date.getMonth() + 1}月${date.getDate()}日星期${weekday}进行排休</div>`;
    }).join('');
}

// 切换到上一周
function previousWeek() {
    const nextMonday = getNextMonday();
    // 如果切换后的周一等于下周一，则不允许再往前切换
    if (currentWeekStart.getTime() <= nextMonday.getTime()) {
        return;
    }
    currentWeekStart = new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    updateWeekRange();
    renderDays();
}

// 切换到下一周
function nextWeek() {
    const nextMonday = getNextMonday();
    const nextSunday = new Date(nextMonday.getTime() + 6 * 24 * 60 * 60 * 1000);
    // 如果切换后的周日超过了下周日，则不允许再往后切换
    if (new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000) >= nextSunday) {
        return;
    }
    currentWeekStart = new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    updateWeekRange();
    renderDays();
}

// 关闭排休申请表单
function closeScheduleRestForm() {
    document.getElementById('scheduleRestPage').style.display = 'none';
    document.getElementById('attendancePage').style.display = 'block';
}

// 提交排休申请
function submitScheduleRestForm() {
    if (selectedDates.size === 0) {
        alert('请选择排休日期');
        return;
    }
    
    const reason = document.getElementById('scheduleRestReason').value;
    if (!reason.trim()) {
        alert('请输入排休原因');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content schedule-success-modal">
            <div class="success-icon">
                <img src="${SUCCESS_ICON_URL}" alt="success">
            </div>
            <div class="success-message">
                <span class="success-text">提交成功！</span><br>
                您已提交排休申请，请耐心等待审批...
            </div>
            <button class="modal-btn" onclick="closeScheduleSuccessModal(this)">确定</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 添加关闭成功弹窗函数
function closeScheduleSuccessModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
    closeScheduleRestForm();
}

// 检查是否在排休开放时间内
function isScheduleRestTimeOpen() {
    const now = new Date();
    const day = now.getDay(); // 0 是周日
    const hour = now.getHours();

    // 检查是否是周日且在 8:00-23:00 之间
    return day === 0 && hour >= 8 && hour < 23;
}

// 显示时间提示弹窗
function showTimeNoticeModal() {
    // 创建弹窗元素
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content time-notice-modal">
            <div class="notice-icon">
                <i class="ri-time-line"></i>
            </div>
            <div class="notice-message">
                排休申请开放时间为<br>每周日 08:00-23:00
            </div>
            <button class="modal-btn" onclick="closeTimeNoticeModal(this)">我知道了</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 关闭时间提示弹窗
function closeTimeNoticeModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
}

// 显示加班申请表单
function showOvertimeForm() {
    document.getElementById('attendancePage').style.display = 'none';
    document.getElementById('overtimePage').style.display = 'block';
    
    // 生成并设置申请编号
    const overtimeId = generateOvertimeId();
    document.getElementById('overtimeId').value = overtimeId;
    
    // 设置申请时间
    const now = new Date();
    const currentTime = now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    document.getElementById('overtimeApplyTime').value = currentTime;
}

// 生成加班申请编号
function generateOvertimeId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `JB${year}${month}${day}${random}`;
}

// 选择加班类型
function selectOvertimeType(element, type) {
    // 移除其他选项的激活状态
    document.querySelectorAll('.overtime-type-item').forEach(item => {
        item.classList.remove('active');
    });
    // 添加当前选项的激活状态
    element.classList.add('active');
}

// 关闭加班申请表单
function closeOvertimeForm() {
    document.getElementById('overtimePage').style.display = 'none';
    document.getElementById('attendancePage').style.display = 'block';
}

// 提交加班申请
function submitOvertimeForm() {
    // 表单验证
    const overtimeType = document.querySelector('.overtime-type-item.active');
    const overtimeDate = document.getElementById('overtimeDate').value;
    const startTime = document.getElementById('overtimeStartTime').value;
    const endTime = document.getElementById('overtimeEndTime').value;
    const reason = document.getElementById('overtimeReason').value;
    
    if (!overtimeType) {
        alert('请选择加班类型');
        return;
    }
    if (!overtimeDate) {
        alert('请选择加班日期');
        return;
    }
    if (!startTime || !endTime) {
        alert('请选择加班时间');
        return;
    }
    if (!reason.trim()) {
        alert('请输入加班原因');
        return;
    }
    
    // 显示成功提示弹窗
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content overtime-success-modal">
            <div class="success-icon">
                <img src="${SUCCESS_ICON_URL}" alt="success">
            </div>
            <div class="success-message">
                <span class="success-text">提交成功！</span><br>
                您已提交加班申请，请耐心等待审批...
            </div>
            <button class="modal-btn" onclick="closeOvertimeSuccessModal(this)">确定</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 添加关闭成功弹窗函数
function closeOvertimeSuccessModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
    closeOvertimeForm();
}

// 关闭各种成功弹窗的函数
function closeScheduleSuccessModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
    closeScheduleRestForm();
}

function closeLeaveSuccessModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
    closeLeaveForm();
}

function closeShiftChangeSuccessModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
    closeShiftChangeForm();
}

function closeOvertimeSuccessModal(btn) {
    const modal = btn.closest('.modal-overlay');
    modal.remove();
    closeOvertimeForm();
}

// 添加显示制度详情页面的函数
function showRegulationDetail() {
    document.getElementById('workspacePage').style.display = 'none';
    document.getElementById('regulationDetailPage').style.display = 'block';
}

// 添加关闭制度详情页面的函数
function closeRegulationDetail() {
    document.getElementById('regulationDetailPage').style.display = 'none';
    document.getElementById('workspacePage').style.display = 'block';
}

// 为员工手册添加点击事件监听器
document.addEventListener('DOMContentLoaded', function() {
    // 找到员工手册的文章项
    const handbookItem = document.querySelector('.article-item');
    if (handbookItem) {
        handbookItem.addEventListener('click', showRegulationDetail);
    }
});

// 消息分类切换功能
function switchMessageTab(element, type) {
    // 移除其他标签的激活状态
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 激活当前标签
    element.classList.add('active');
    
    // 根据类型显示不同的消息列表
    const emptyMessage = document.querySelector('.empty-message');
    const messageList = document.querySelector('.message-list');
    
    // 这里可以根据实际情况判断是否有消息
    const hasMessages = false; // 示例：暂时设置为没有消息
    
    if (hasMessages) {
        emptyMessage.style.display = 'none';
        messageList.style.display = 'block';
        // 加载对应类型的消息列表
        loadMessages(type);
    } else {
        emptyMessage.style.display = 'block';
        messageList.style.display = 'none';
    }
}

// 加载消息列表
function loadMessages(type) {
    const messageList = document.querySelector('.message-list');
    // 这里可以根据type加载不同类型的消息
    // 示例：
    messageList.innerHTML = `
        <div class="message-item">
            <img src="avatar.jpg" class="message-avatar" alt="avatar">
            <div class="message-info">
                <div class="message-header">
                    <span class="message-name">张三</span>
                    <span class="message-time">09:30</span>
                </div>
                <div class="message-preview">你好，请问有什么可以帮到你？</div>
            </div>
        </div>
    `;
}

// 显示消息操作选项
function showMessageOptions() {
    const modal = document.getElementById('messageOptionsModal');
    modal.style.display = 'block';
    
    // 点击其他区域关闭弹窗
    document.addEventListener('click', closeMessageOptions);
}

// 关闭消息操作选项
function closeMessageOptions(event) {
    const modal = document.getElementById('messageOptionsModal');
    const addBtn = document.querySelector('.add-btn');
    
    // 如果点击的不是弹窗内部元素且不是添加按钮，则关闭弹窗
    if (!modal.contains(event.target) && !addBtn.contains(event.target)) {
        modal.style.display = 'none';
        document.removeEventListener('click', closeMessageOptions);
    }
}

// 扫一扫功能
function handleScan() {
    alert('扫一扫功能开发中...');
    document.getElementById('messageOptionsModal').style.display = 'none';
}

// 创建群聊功能
function createGroupChat() {
    alert('创建群聊功能开发中...');
    document.getElementById('messageOptionsModal').style.display = 'none';
}