
// MFCApplicationTestDlg.cpp : implementation file
//

#include "stdafx.h"
#include "MFCApplicationTest.h"
#include "MFCApplicationTestDlg.h"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CAboutDlg dialog used for App About

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// Dialog Data
#ifdef AFX_DESIGN_TIME
	enum { IDD = IDD_ABOUTBOX };
#endif

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

// Implementation
protected:
	DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialogEx(IDD_ABOUTBOX)
{
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);

}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()


// CMFCApplicationTestDlg dialog



CMFCApplicationTestDlg::CMFCApplicationTestDlg(CWnd* pParent /*=NULL*/)
	: CDialogEx(IDD_MFCAPPLICATIONTEST_DIALOG, pParent)
   , m_cbEdit(_T(""))
{
	m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
}

void CMFCApplicationTestDlg::DoDataExchange(CDataExchange* pDX)
{
   CDialogEx::DoDataExchange(pDX);
   DDX_CBString(pDX, IDC_COMBO1, m_cbEdit);
   DDX_Control(pDX, IDC_EDIT1, m_ee);
   DDX_Control(pDX, IDC_EDIT3, m_ee2);
}

BEGIN_MESSAGE_MAP(CMFCApplicationTestDlg, CDialogEx)
	ON_WM_SYSCOMMAND()
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
   ON_CBN_SELCHANGE(IDC_COMBO1, &CMFCApplicationTestDlg::OnCbnSelchangeCombo1)
   ON_EN_CHANGE(IDC_EDIT1, &CMFCApplicationTestDlg::OnEnChangeEdit1)
   ON_EN_CHANGE(IDC_EDIT2, &CMFCApplicationTestDlg::OnEnChangeEdit2)
   ON_EN_CHANGE(IDC_EDIT3, &CMFCApplicationTestDlg::OnEnChangeEdit3)
END_MESSAGE_MAP()


// CMFCApplicationTestDlg message handlers

BOOL CMFCApplicationTestDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// Add "About..." menu item to system menu.

	// IDM_ABOUTBOX must be in the system command range.
	ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
	ASSERT(IDM_ABOUTBOX < 0xF000);

	CMenu* pSysMenu = GetSystemMenu(FALSE);
	if (pSysMenu != NULL)
	{
		BOOL bNameValid;
		CString strAboutMenu;
		bNameValid = strAboutMenu.LoadString(IDS_ABOUTBOX);
		ASSERT(bNameValid);
		if (!strAboutMenu.IsEmpty())
		{
			pSysMenu->AppendMenu(MF_SEPARATOR);
			pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
		}
	}

	// Set the icon for this dialog.  The framework does this automatically
	//  when the application's main window is not a dialog
	SetIcon(m_hIcon, TRUE);			// Set big icon
	SetIcon(m_hIcon, FALSE);		// Set small icon

	// TODO: Add extra initialization here

   m_cbEdit.Append(L"asdfasd");
   UpdateData(false);
	return TRUE;  // return TRUE  unless you set the focus to a control
}

void CMFCApplicationTestDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
	if ((nID & 0xFFF0) == IDM_ABOUTBOX)
	{
		CAboutDlg dlgAbout;
		dlgAbout.DoModal();
	}
	else
	{
		CDialogEx::OnSysCommand(nID, lParam);
	}
}

// If you add a minimize button to your dialog, you will need the code below
//  to draw the icon.  For MFC applications using the document/view model,
//  this is automatically done for you by the framework.

void CMFCApplicationTestDlg::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // device context for painting

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// Center icon in client rectangle
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// Draw the icon
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		CDialogEx::OnPaint();
	}
}

// The system calls this function to obtain the cursor to display while the user drags
//  the minimized window.
HCURSOR CMFCApplicationTestDlg::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}



void CMFCApplicationTestDlg::OnCbnSelchangeCombo1()
{
   // TODO: Add your control notification handler code here
}


void CMFCApplicationTestDlg::OnEnChangeEdit1()
{
   // TODO:  If this is a RICHEDIT control, the control will not
   // send this notification unless you override the CDialogEx::OnInitDialog()
   // function and call CRichEditCtrl().SetEventMask()
   // with the ENM_CHANGE flag ORed into the mask.

   // TODO:  Add your control notification handler code here
   //m_ee.SetWindowTextW(L"asasdfa");
   UpdateData(true);

   CString val;
   m_ee.GetWindowTextW(val);
   m_ee2.SetWindowTextW(val);
   m_ee2.SetReadOnly();
   //AfxMessageBox(val);

   UpdateData(false);
}


void CMFCApplicationTestDlg::OnEnChangeEdit2()
{
   // TODO:  If this is a RICHEDIT control, the control will not
   // send this notification unless you override the CDialogEx::OnInitDialog()
   // function and call CRichEditCtrl().SetEventMask()
   // with the ENM_CHANGE flag ORed into the mask.

   // TODO:  Add your control notification handler code here

   
}


void CMFCApplicationTestDlg::OnEnChangeEdit3()
{
   // TODO:  If this is a RICHEDIT control, the control will not
   // send this notification unless you override the CDialogEx::OnInitDialog()
   // function and call CRichEditCtrl().SetEventMask()
   // with the ENM_CHANGE flag ORed into the mask.

   // TODO:  Add your control notification handler code here
}
